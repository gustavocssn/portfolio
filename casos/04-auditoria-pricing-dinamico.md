# Auditoria de um motor de Pricing Dinâmico

**Status:** em andamento (validação de backtests e documentação)

## Contexto

Um motor em produção precifica propostas de crédito: projeta o fluxo de caixa do contrato mês a mês
(juros, custo de funding, pré-pagamento/portabilidade, garantias, perdas) e escolhe a taxa que maximiza a
rentabilidade esperada. O time de negócio define as premissas numa calculadora de referência; o time de Data
Science implementa no código. Meu papel: conferir se o que está no código reflete exatamente o que o negócio definiu, e documentar.

## O que fiz

1. **Réplica independente da régua de negócio.** Reescrevi em Python o motor de perdas de referência a partir da
   especificação e conferi contra a tabela oficial: todos os ratings batendo (diferença máxima de arredondamento de ponto flutuante).
2. **Comparação contrato a contrato com o motor do DS.** Rodei a régua sobre os mesmos saldos e probabilidades do motor:
   **cenários de teste batendo centavo a centavo** em perda bruta, recuperação, portabilidade e perda final.
3. **Protótipo de convolução da portabilidade.** Quando uma curva de transição é medida em "meses desde o evento",
   aplicá-la diretamente sobre "meses de contrato" distorce a projeção. Demonstrei matematicamente que essa simplificação **subestima o efeito acumulado em 12 a 38 p.p.** (em cenários sintéticos) e validei no código do motor a implementação correta via convolução.
4. **Conciliação do fluxo mensal do motor.** Mapeamento completo das identidades contábeis do relatório de saída, alinhando nomenclaturas de colunas, decomposição de resíduos e regras de casamento temporal entre receitas e custos de funding ao longo da cauda do contrato.
5. **Planilha "com fórmulas"** que reproduz o fluxo de um contrato do código até a $6^{\text{a}}$ casa decimal, dando transparência para quem não lê Python.
6. **Estrutura de documentação** que complementa (sem duplicar) a documentação do DS: fluxo passo a passo, cascata de perdas,
   como rodar e validar, e matriz de responsabilidades.

## O que aprendi

Validar modelo é montar uma segunda implementação independente e comparar até o centavo. Quando não bate, a diferença
quase sempre é convenção (eixo de tempo, base de cálculo, rótulo), não erro de conta.

👉 Demo com dados sintéticos: [`demos/portabilidade-convolucao`](../demos/portabilidade-convolucao/).