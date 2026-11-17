# Disparadores de Pricing no Slack

**Status:** em produção desde set/2026, todo dia útil · **Usuários:** time de Pricing e times das BUs de crédito

## Problema

O time já tinha um relatório diário automático de custo de crédito. Faltava o equivalente para **pricing**: a taxa
média do dia e do mês, por produto, comparada com o que foi projetado. Os dados estavam espalhados em consultas e
planilhas diferentes por BU, cada uma carregando num horário.

## O que construí

```
Consultas SQL (uma por BU)  →  planilha de base  →  planilha de layout (tabela cruzada BU × métricas)  →  Slack
Data Warehouse (SQL)          Apps Script            fórmulas + IMPORTRANGE                       Apps Script
```

- **Taxa ponderada pela originação** do dia e acumulada do mês, com desvio contra projeção.
- **Um canal por BU** + um consolidado. Cada canal sai **assim que a BU dele tem o dado do dia**; o consolidado sai quando todas
  estão prontas, ou num horário-limite, com aviso ❗ para o que não chegou.
- **Retentativa de hora em hora**: a sincronização da base sofria instabilidades intermitentes; com a fila de retentativa, o envio aguarda a normalização sem perder o disparo do dia.
- **Prontidão medida pela data na tabela final**, não pelo sucesso da importação (a camada intermediária atualiza com atraso).
- **Calendário por BU** (algumas operam no fim de semana, outras não) para saber qual é a "data esperada" de cada uma.
- **Boas práticas de segurança**: gerenciamento de credenciais e tokens de autenticação isolados do código-fonte via `ScriptProperties`.

Um segundo disparador acompanha a originação do mês por segmento e a composição de risco da safra, com alertas visuais (✅/❗) contra limites mensais definidos pelo time.

## Resultado

- No ar desde set/2026, sem intervenção manual no dia a dia.
- Uma falha temporária na fonte passou a custar **1 hora de atraso, e não o dia inteiro**.
- A estrutura aceita novos indicadores sem reescrita (uma consulta e uma coluna por componente).

## O que aprendi

Desenhar para o dado que chega atrasado, e não para o caso feliz. A maior parte do código é sobre "o dado de hoje já chegou?".

👉 Modelo genérico em [`demos/disparador-sheets-slack`](../demos/disparador-sheets-slack/).
