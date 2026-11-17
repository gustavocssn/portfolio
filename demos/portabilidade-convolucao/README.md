# Demo: curva no eixo de tempo errado (MoB × convolução por MOR)

Todos os parâmetros são **sintéticos** (ticket, taxa, attrition e a própria curva).

**Pergunta:** uma curva mede quanto do saldo volta *m meses depois da saída do emprego*. Se você a aplica usando
*o mês do contrato* em que a saída aconteceu, quanto erra?

```bash
python convolucao.py
```

Saída (curva sintética que satura em 80%):

| Prazo | Attrition a.m. | Por MoB | Convolução (até o prazo) | Convolução (horizonte longo) | Diferença |
|---|---|---|---|---|---|
| 12 | 3% | 45,1% | 60,5% | 80,0% | 34,9 pp |
| 24 | 3% | 57,1% | 74,0% | 80,0% | 22,9 pp |
| 36 | 3% | 62,6% | 77,5% | 80,0% | 17,4 pp |
| 48 | 3% | 65,6% | 78,7% | 80,0% | 14,4 pp |

**Leitura:** o atalho por MoB subestima o efeito em 12 a 36 p.p., mais em prazos curtos, porque quase todas as saídas
acontecem quando o índice da curva ainda está baixo. Com a convolução, cada grupo de saída percorre a curva inteira e a
efetiva converge para o teto. Assinatura prática: na convolução o efeito continua aparecendo **depois** do último mês de saída.
