# Gustavo César — Portfólio de IA e Automação

Estudante de Engenharia Mecânica-Aeronáutica no **ITA** e estagiário em **Price & Profitability** numa fintech de crédito.
Construo ferramentas com IA que entram em produção e são usadas pelo time no dia a dia: relatórios automáticos,
agentes que escrevem e conferem apresentações executivas e validação de modelos de precificação.

> Os casos abaixo descrevem trabalho real de forma **anonimizada**: sem dados, código, nomes de tabelas ou pessoas
> da empresa. As demos rodam com **dados sintéticos** e foram reescritas do zero para este portfólio.

## Casos

| # | Caso | O que resolve | Stack | Status |
|---|---|---|---|---|
| 1 | [Disparadores de Pricing no Slack](casos/01-disparadores-pricing.md) | Indicadores diários de 4 BUs chegando sozinhos no canal de cada time | SQL, Google Apps Script, Sheets, Slack API | Em produção (desde set/26) |
| 2 | [Textos do Monthly Review com IA](casos/02-monthly-review-ia.md) | Comentários de slides de comitê gerados a partir das planilhas, com checagens | Gemini (`=AI()`), Apps Script, Google Slides | Usado em comitê real |
| 3 | [Skills (agentes) do Claude para MR](casos/03-skills-claude.md) | Agente que monta e agente que confere a apresentação mensal | Claude Skills, conectores Sheets/Slides | Em uso pelo time |
| 4 | [Auditoria de um motor de Pricing Dinâmico](casos/04-auditoria-pricing-dinamico.md) | Conferir se o motor em produção faz o que o negócio definiu | Python, Claude Code, Excel | Validação de backtests |

## Demos (dados sintéticos)

- [`demos/portabilidade-convolucao`](demos/portabilidade-convolucao/) — por que aplicar uma curva no eixo de tempo errado subestima um efeito em dezenas de p.p.
- [`demos/disparador-sheets-slack`](demos/disparador-sheets-slack/) — modelo de disparador Sheets → Slack com envio por canal, retentativa e alerta de dado velho.

## Como eu uso IA no trabalho

- **IA escreve, número vem da fonte.** Nos textos gerados, todo número sai da planilha já calculado; a IA só redige.
- **Checagem antes de gerar, trava antes de publicar.** Nada vai para o slide ou para o Slack sem passar por validações "tudo ou nada".
- **Fórmula quando o texto tem modelo fixo, IA quando é comentário.** A ferramenta mais simples que resolve.
- **Documentação viva.** Cada projeto tem um arquivo de contexto que humanos e IAs leem e atualizam a cada decisão.

## Stack

Python · JavaScript / Google Apps Script · SQL · Claude (Claude Code, Skills) · Gemini · Google Sheets/Slides · Slack API · FastAPI · Streamlit · Supabase/PostgreSQL · n8n

## Experiência anterior

- **M7 Soluções Financeiras** — automações n8n + JavaScript entre site, RD Station e CRM; distribuição de leads por roleta ponderada.
- **ITA Júnior** — MVP de monitoramento de TI (FastAPI, Supabase, Streamlit).

## Contato

[LinkedIn](https://linkedin.com/in/gustavo--cesar) · gustavo.04neves@gmail.com
