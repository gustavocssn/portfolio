# Textos do Monthly Review com IA

**Status:** usado no comitê mensal de uma BU (set/2026) e replicado para uma segunda BU

## Problema

Todo mês o time monta o **Monthly Review (MR)** de cada BU: um deck de comitê em que Pricing é dono de cerca de 13 slides.
Os gráficos já atualizavam com um clique. O gargalo eram os **textos**: abrir o MR do mês anterior, ler e reescrever cada
comentário comparando os números novos. Restrição da liderança: o entregável final continua sendo Google Slides → PDF.

## O que construí

Uma aba "Textos MR" dentro da própria planilha-mestre do MR:

1. **Mês de referência numa célula**: todos os números acompanham. As colunas são achadas **pelo mês**, nunca pela letra.
2. **Números já calculados** (variações em bps e p.p.), com uma coluna "Confere" que mostra o rótulo lido.
3. **Contexto do mês** escrito uma vez, em 3 blocos (mês anterior, mês atual, próximo mês), compartilhado por todos os slides.
4. **Um bloco por slide**, escolhendo a ferramenta mais simples:
   - comentário do mês → **Gemini** (`=AI()` do Sheets) com números, contexto e textos dos meses anteriores como referência;
   - frase com modelo fixo → **fórmula**, sem IA;
   - narrativa estável → parágrafos fixos + atualização só do que mudou.
5. **Checagens e travas** ("tudo ou nada") antes de gerar e antes de enviar: mês fechado, colunas certas, metas lidas, contexto atualizado.
6. **Histórico de textos** por mês e **envio automático ao Google Slides** por Apps Script, com prévia, log e desfazer.

> "A IA não inventa número. Todo número vem da planilha e toda causa vem do contexto que a gente escreve."

## Resultado

- Validado contra o MR real de um mês fechado antes do primeiro uso.
- Primeiro uso real no comitê de set/2026, conferido lado a lado com a analista responsável.
- Virou um **método** (playbook de 7 passos) replicado para outra BU.

## O que aprendi

- Ajuste de prompt tem limite: corrigir fato omitido e formato; escolha de palavras fica para a revisão humana.
- Limitações práticas da `=AI()`: não aceita funções aninhadas e não recalcula sozinha, o que virou um passo explícito do processo.
