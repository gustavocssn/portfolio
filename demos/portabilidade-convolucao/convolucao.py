"""Aplicar uma curva no eixo de tempo errado: MoB x MOR (convolução).

Cenário (100% sintético): um empréstimo consignado é descontado em folha. Quando a
pessoa sai do emprego, o saldo deixa de ser descontado. Parte dessas pessoas arruma
outro emprego e o empréstimo é "portado" para o novo empregador. A curva de
portabilidade diz qual % do saldo já voltou até m meses DEPOIS da saída (MOR).

- Método simplificado (por MoB): a saída do mês t do contrato recebe o nível da
  curva na posição t e para por aí.
- Convolução (por MOR): cada mês de saída s percorre a curva desde o MOR 1:
      portado(u) = soma_{s<u} saida(s) * (curva[u-s] - curva[u-s-1])

Sem dependências: python convolucao.py
"""

import math

# Parâmetros e forma funcional 100% arbitrários/didáticos (sem relação com dados reais)
TICKET = 10_000.0
TAXA = 0.04            # a.m. (fictícia)
PRAZOS = [12, 24, 36, 48]
ATTRITIONS = [0.015, 0.03, 0.05]   # prob. mensal hipotética de saída
HORIZONTE_EXTRA = 48   # meses extras para observar a cauda
TETO, VELOCIDADE = 0.80, 0.22      # curva exponencial ilustrativa


def curva(m):
    """% acumulado do saldo que voltou até o MOR m (sintético)."""
    return 0.0 if m <= 0 else TETO * (1 - math.exp(-VELOCIDADE * m))


def saldos_price(prazo):
    parcela = TICKET * TAXA / (1 - (1 + TAXA) ** -prazo)
    saldo, saldos = TICKET, []
    for _ in range(prazo):
        saldos.append(saldo)
        saldo = saldo * (1 + TAXA) - parcela
    return saldos


def saidas(prazo, attrition):
    """Saldo que sai da folha em cada mês t = 1..prazo."""
    vivos, out = 1.0, []
    for saldo in saldos_price(prazo):
        out.append(vivos * attrition * saldo)
        vivos *= 1 - attrition
    return out


def efetiva_mob(saida):
    return sum(x * curva(t) for t, x in enumerate(saida, start=1)) / sum(saida)


def efetiva_convolucao(saida, horizonte):
    portado = 0.0
    for s, x in enumerate(saida, start=1):
        for u in range(s + 1, horizonte + 1):
            portado += x * (curva(u - s) - curva(u - s - 1))
    return portado / sum(saida)


if __name__ == "__main__":
    print(f"{'prazo':>5} {'attr':>5} {'MoB':>7} {'conv(prazo)':>12} {'conv(longo)':>12} {'gap':>7}")
    for prazo in PRAZOS:
        for a in ATTRITIONS:
            sd = saidas(prazo, a)
            mob = efetiva_mob(sd)
            c_prazo = efetiva_convolucao(sd, prazo)
            c_longo = efetiva_convolucao(sd, prazo + HORIZONTE_EXTRA)
            print(f"{prazo:>5} {a:>5.1%} {mob:>7.1%} {c_prazo:>12.1%} {c_longo:>12.1%} {(c_longo - mob) * 100:>6.1f}pp")
