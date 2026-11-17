# Demo: disparador Google Sheets → Slack

Modelo genérico (dados e canais fictícios) do padrão usado no caso [Disparadores de Pricing](../../casos/01-disparadores-pricing.md).

- **Envio por canal** assim que todos os grupos daquele canal têm o dado do dia.
- **Calendário por grupo** para saber qual é a data esperada (há grupos sem dado no fim de semana).
- **Retentativa de hora em hora** e, no horário-limite, envio do que faltar com aviso ❗.
- **Idempotente**: marca cada canal como enviado no dia, então rodar de novo não duplica.
- Token em *Script Properties*, nunca no código.

Como testar: crie uma planilha com a aba `Painel` (A = grupo, B = data, C.. = métricas), cole `Code.gs` no Apps Script,
salve `SLACK_TOKEN` nas propriedades do script, troque os IDs de canal e rode `verificarEDisparar`.
