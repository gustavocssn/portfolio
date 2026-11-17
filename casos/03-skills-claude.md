# Skills (agentes) do Claude para o Monthly Review

**Status:** em uso pelo time, instaladas por cada pessoa na conta corporativa

## Problema

Outras BUs já usavam o Claude para escrever o MR, cada uma do seu jeito. Faltava um formato padronizado, reaproveitável e
que **conferisse** o deck, não só escrevesse.

## O que construí

Duas skills, com a mesma arquitetura modular (uma skill gigante estoura o contexto):

| Arquivo | Papel | Comum a todas as BUs? |
|---|---|---|
| `SKILL.md` | "comece por aqui": ordem de leitura e fluxo | quase |
| `escrita.md` | regras de estilo e de números | sim |
| `checagens.md` | o que validar antes de entregar | sim |
| `bu.md` | fontes e slides da BU | não |
| `exemplos/` | textos e contexto de meses anteriores | não |

- **Skill de escrita (por BU):** lê a planilha-mestre e o deck pelo conector do Google Drive e devolve os textos de Pricing do mês.
- **Skill revisora (deck consolidado):** cruza a tabela do snapshot com a planilha consolidada, confere se os textos batem com
  tabelas e gráficos, se o mês está certo e se sobrou pendência no texto. Usa os conectores do Google Sheets e Slides.

## Resultado

- Distribuídas como `.zip` instalável; os arquivos comuns têm uma versão-mestre para replicar em novas BUs.
- A revisora aplica a ideia de que cada slide precisa ter **insight, decisão e padrão**, sugerida por outro time.

## O que aprendi

Escrever instruções para agentes é escrever documentação: curta, em arquivos separados por assunto e com exemplos reais.
