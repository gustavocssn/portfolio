/**
 * Disparador genérico Google Sheets → Slack (modelo para portfólio, dados fictícios).
 *
 * A aba "Painel" tem: coluna A = grupo (ex.: produto), B = data do dado, C.. = métricas.
 * Cada canal recebe as linhas dos grupos dele assim que TODOS esses grupos tiverem o dado
 * esperado do dia. No horário-limite, envia o que faltar com um aviso ❗.
 *
 * Script Properties necessárias: SLACK_TOKEN (bot token com chat:write).
 */

const CONFIG = {
  ABA: 'Painel',
  HORA_LIMITE: 14,
  CANAIS: [
    { id: 'C_CANAL_PRODUTO_A', grupos: ['Produto A'] },
    { id: 'C_CANAL_PRODUTO_B', grupos: ['Produto B'] },
    { id: 'C_CANAL_TIME', grupos: ['Produto A', 'Produto B', 'Produto C'] },
  ],
  // Em que dias da semana cada grupo tem dado (0 = dom … 6 = sáb).
  CALENDARIO: {
    'Produto A': [1, 2, 3, 4, 5, 6],
    'Produto B': [1, 2, 3, 4, 5],
    'Produto C': [0, 1, 2, 3, 4, 5, 6],
  },
};

/** Roda de hora em hora (ver criarTrigger). */
function verificarEDisparar() {
  const agora = new Date();
  const limite = agora.getHours() >= CONFIG.HORA_LIMITE;
  const linhas = lerPainel_();
  const props = PropertiesService.getScriptProperties();
  const hoje = Utilities.formatDate(agora, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  CONFIG.CANAIS.forEach((canal) => {
    const chave = `ENVIO_${canal.id}`;
    if (props.getProperty(chave) === hoje) return; // já enviado hoje

    const minhas = linhas.filter((l) => canal.grupos.includes(l.grupo));
    const atrasadas = minhas.filter((l) => l.data < dataEsperada_(l.grupo, agora));
    if (atrasadas.length && !limite) return; // tenta de novo na próxima hora

    enviarSlack_(canal.id, montarMensagem_(minhas, atrasadas));
    props.setProperty(chave, hoje);
  });
}

/** Último dia (antes de hoje) em que o grupo deveria ter dado. */
function dataEsperada_(grupo, agora) {
  const dias = CONFIG.CALENDARIO[grupo] || [];
  const d = new Date(agora);
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    d.setDate(d.getDate() - 1);
    if (dias.includes(d.getDay())) return d;
  }
  return new Date(8.64e15); // grupo fora do calendário: nunca fica pronto
}

function lerPainel_() {
  const valores = SpreadsheetApp.getActive().getSheetByName(CONFIG.ABA).getDataRange().getValues();
  const [cab, ...dados] = valores;
  return dados
    .filter((l) => l[0])
    .map((l) => ({ grupo: l[0], data: new Date(l[1]), metricas: cab.slice(2).map((n, i) => [n, l[i + 2]]) }));
}

function montarMensagem_(linhas, atrasadas) {
  const corpo = linhas
    .map((l) => `*${l.grupo}* — ` + l.metricas.map(([n, v]) => `${n}: ${v}`).join(' · '))
    .join('\n');
  const aviso = atrasadas.map((l) => `\n:exclamation: dado de ${l.grupo} desatualizado`).join('');
  return corpo + aviso;
}

function enviarSlack_(canal, texto) {
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
  const resp = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${token}` },
    payload: JSON.stringify({ channel: canal, text: texto }),
    muteHttpExceptions: true,
  });
  const json = JSON.parse(resp.getContentText());
  if (!json.ok) throw new Error(`Slack: ${json.error}`);
}

function criarTrigger() {
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('verificarEDisparar').timeBased().everyHours(1).create();
}
