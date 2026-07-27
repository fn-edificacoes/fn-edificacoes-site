# Fluxo de reclamação de parceiro

O cliente não reclama com o vidraceiro. Reclama com quem indicou o vidraceiro — ou seja, com
você. Esse é o custo real de fazer curadoria, e é também o que a torna valiosa: se reclamar não
mudar nada, a indicação da FN não vale mais do que uma busca no Google.

**Meta operacional: responder em até 24 horas.** Não resolver em 24h — *responder*. A maior parte
da raiva do cliente vem do silêncio, não do defeito.

---

## 1. O fluxo

```
Cliente reclama (WhatsApp, ligação, e-mail ou avaliação)
        │
        ▼
[≤ 24h]  Atendimento registra e responde ao cliente
        │  · registra em clube_reclamacao (parceiro, motivo, descrição)
        │  · responde: "recebi, vou falar com ele hoje e te retorno"
        ▼
[≤ 48h]  Atendimento aciona o parceiro, por escrito
        │  · descreve o problema e pede posição em 48h
        ▼
        ┌──────────────────┬──────────────────────┐
        ▼                  ▼                      ▼
   Parceiro resolve   Parceiro contesta      Parceiro ignora
        │                  │                      │
        ▼                  ▼                      ▼
   Fecha ocorrência   Curadoria avalia       SUSPENSÃO IMEDIATA
   e confirma com     as duas versões        de novas indicações
   o cliente          e decide
        │
        ▼
   3 ocorrências em 30 dias no mesmo parceiro
        → suspensão automática + revisão obrigatória
```

**A regra dos três em trinta é automática e está em contrato** (minuta, cláusula 8.2). É objetiva
de propósito: para você não ter que decidir na hora, com o parceiro do outro lado da linha
pedindo mais uma chance. Se depender de julgamento caso a caso, sempre vai ter uma boa desculpa —
e a curadoria vira enfeite.

---

## 2. Classificação

| Motivo | Exemplos | Gravidade |
|---|---|---|
| `prazo` | Atrasou, remarcou, sumiu | Alta — é a reclamação nº 1 do setor |
| `execucao` | Serviço malfeito, precisou refazer, danificou algo | **Crítica** |
| `atendimento` | Grosseria, não responde, não dá satisfação | Alta |
| `preco` | Cobrou mais do que o combinado, ou mais que o preço de rua | **Crítica** — quebra cláusula contratual |
| `seguranca` | Serviço de risco sem EPI, sem seguro, sem habilitação | **Eliminatória — descredenciamento imediato** |

`seguranca` não entra na contagem de três: **uma ocorrência já descredencia.** Rede de proteção
mal instalada, elétrica sem habilitação e trabalho em altura sem proteção não têm segunda chance.

---

## 3. Mensagens prontas

### Para o cliente, no recebimento (≤ 24h)

```
{{nome}}, obrigado por avisar — e desculpa pelo transtorno.

Vou falar com o {{parceiro}} hoje mesmo e te retorno até {{prazo}}.

Só para você saber como funciona: a gente registra toda reclamação e acompanha o
histórico de cada parceiro. Quem não resolve sai da nossa lista. É o que faz a nossa
indicação valer alguma coisa.
```

### Para o parceiro (≤ 48h)

```
{{parceiro}}, recebemos uma reclamação do cliente {{cliente}}, indicado por nós em
{{data}}.

Relato: {{descricao}}

Preciso da sua posição em até 48h e, se procede, do prazo de solução.

Lembrando o que combinamos em contrato: três reclamações fundamentadas em 30 dias
suspendem o envio de novas indicações. Esta é a {{n}}ª nos últimos 30 dias.
```

### Para o cliente, no fechamento

```
{{nome}}, falei com o {{parceiro}} e {{resolucao}}.

Ficou resolvido para você? Se ainda tiver alguma pendência, me avisa que eu continuo
acompanhando.
```

### Para o parceiro, na suspensão

```
{{parceiro}}, chegamos à terceira reclamação fundamentada em 30 dias
({{motivo1}}, {{motivo2}}, {{motivo3}}).

Conforme a cláusula 8.2 do nosso termo, o envio de novas indicações está suspenso a
partir de hoje.

As comissões de serviços já contratados seguem devidas normalmente.

Para reavaliarmos, preciso de: (1) a solução das três ocorrências confirmada pelos
clientes e (2) uma conversa sobre o que mudou no seu processo.

Não é definitivo, mas também não é automático — a volta depende dessas duas coisas.
```

> **Por que avisar o parceiro a cada ocorrência, e não só na terceira:** ele consegue corrigir
> antes de perder o credenciamento, e ninguém pode alegar surpresa. Suspensão que chega sem aviso
> gera conflito; suspensão anunciada em três tempos é aceita, e às vezes nem acontece.

---

## 4. O que registrar sempre

| Campo | Por quê |
|---|---|
| Parceiro, cliente e data da indicação | Base da contagem e da conferência de comissão |
| Motivo (classificação acima) | Permite ver padrão por tipo, não só por parceiro |
| Descrição no texto do cliente | Não parafraseie — a palavra dele é a evidência |
| Data da resposta ao cliente | Mede o prazo de 24h |
| Posição do parceiro | Necessária se virar disputa |
| Resolução e data | Fecha a ocorrência |

Estrutura de banco em `../integracao-sistema.md`, tabela `clube_reclamacao`. O job diário que
aplica a regra dos três em trinta está especificado lá.

---

## 5. Revisão trimestral de parceiros

A cada trimestre, a curadoria revisa todos e classifica:

| Situação | Ação |
|---|---|
| Zero reclamação e prazo cumprido | Mantém e **aumenta prioridade** de indicação |
| 1 a 2 reclamações resolvidas | Mantém, com observação registrada |
| 3+ reclamações ou alguma não resolvida | Suspende |
| Qualquer ocorrência de `seguranca` | Descredencia |
| Sem nenhuma indicação fechada em 6 meses | Reavalia se faz sentido manter |

**Publicar o resultado anualmente** — quantos parceiros entraram, quantos saíram e por quê — é o
relatório de transparência da curadoria (Etapa 11, item 11.7). Conformidade que vira marketing:
nenhum concorrente vai querer publicar isso, e é exatamente por isso que funciona.
