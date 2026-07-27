# Etapa 10 — Plano de implantação

**Como ler.** Cada tarefa tem responsável, prazo, objetivo, resultado esperado e indicador.
Prioridade **P0** significa que a fase não avança sem ela. As siglas de responsável:

`DIR` Diretoria FN · `LID` Líder da Loja · `CUR` Curadoria · `CONT` Conteúdo ·
`TEC` Tecnologia · `PAR` Parcerias · `ATE` Atendimento/CS · `JUR` Jurídico

> **Ponto de partida real.** A vitrine, o catálogo de 300 itens, os 18 kits, o rastreio com subid
> e a página de transparência **já estão construídos** neste repositório. O plano abaixo começa,
> portanto, na validação e na monetização — não na construção.

---

## Primeiros 7 dias — ligar a monetização e não errar o começo

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 1 | Cadastrar nos programas Mercado Livre, Amazon, Leroy Merlin e Magalu | **P0** | PAR | Obter as tags de afiliado | 4 cadastros enviados | Nº de cadastros aprovados |
| 2 | Confirmar comissão real, cookie e suporte a subid de cada programa | **P0** | PAR | Substituir estimativa por dado | Tabela da Etapa 4 corrigida | Linhas confirmadas / 10 |
| 3 | Preencher `tag` e `subid` em `src/dados/catalogo.js` | **P0** | TEC | Ligar a receita | Links saindo com atribuição | Cliques atribuídos > 95% |
| 4 | Revisão jurídica das políticas em `/loja/transparencia/` | **P0** | JUR | Blindar o modelo | Texto aprovado | Parecer emitido |
| 5 | Preencher razão social, CNPJ, e-mail de titular e DPO na página de transparência | **P0** | DIR | Cumprir a LGPD (art. 41) | Página completa | Campos pendentes = 0 |
| 6 | Definir o líder da unidade e o P&L separado | **P0** | DIR | Dar dono ao negócio | Nomeação formal | Papel preenchido |
| 7 | Publicar a loja e o bloco no site institucional | P1 | TEC | Colocar no ar | `/loja/` em produção | Build verde e páginas indexáveis |
| 8 | Instrumentar GA4 e ligar ao `dataLayer` já existente | P1 | TEC | Medir desde o dia 1 | Evento `fn_loja_saida` chegando | Eventos/dia > 0 |
| 9 | Listar 20 parceiros locais candidatos ao FN Club | P1 | PAR | Preparar o motor de margem | Lista com contato | Nº de contatos mapeados |
| 10 | Comunicar a equipe de vistoria sobre a loja e o que **não** dizer | **P0** | LID | Evitar conflito de interesse na ponta | Roteiro de campo entregue | 100% da equipe treinada |

---

## Primeiros 15 dias — provar que o cliente clica

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 11 | Enviar a loja aos 30 clientes mais recentes, um a um, pelo WhatsApp | **P0** | ATE | Teste real de reação | 30 conversas | Taxa de clique > 40% |
| 12 | Entrevistar 10 clientes sobre o que compraram e onde | **P0** | LID | Validar a jornada da Etapa 2 | Relatório de 10 entrevistas | Etapas confirmadas / 7 |
| 13 | Negociar os 5 primeiros contratos do FN Club | **P0** | PAR | Ativar o motor C | 5 acordos com comissão escrita | Comissão média ≥ 10% |
| 14 | Cadastrar em Shopee e MadeiraMadeira | P1 | PAR | Cobrir móveis e baixo ticket | 2 cadastros | Aprovações |
| 15 | Publicar os 4 primeiros conteúdos do pilar "vistoria real" | P1 | CONT | Testar formato | 4 peças no ar | Retenção > 50% |
| 16 | Criar o painel de acompanhamento semanal | P1 | LID | Gestão por número, não por sensação | Painel com 8 KPIs | Atualizado toda segunda |
| 17 | Definir o roteiro de campo: o que o vistoriador fala sobre a loja | **P0** | LID + JUR | Proteger a imparcialidade do laudo | Roteiro de uma página | Aderência em auditoria |

---

## Primeiros 30 dias — a primeira comissão

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 18 | Fechar a primeira comissão confirmada | **P0** | LID | Provar o ciclo inteiro | Comissão creditada | Ciclo clique→venda→crédito fechado |
| 19 | Implementar os gatilhos 1 a 4 da régua (Etapa 8) | **P0** | TEC | Automatizar o momento de maior conversão | 4 gatilhos ativos | Taxa de resposta > 25% |
| 20 | Publicar o endpoint `/loja/perfil/:id` no Sistema | **P0** | TEC | Personalizar por laudo | API respondendo | Latência < 300 ms |
| 21 | Assinar o link do Sistema com `?fn=` e `?chaves=` | **P0** | TEC | Atribuir por cliente | Links assinados | % de sessões identificadas |
| 22 | Revisar o catálogo com base nos cliques reais | P1 | CUR | Cortar o que não interessa | Itens repriorizados | Nº de itens despublicados |
| 23 | Formalizar contratos com os parceiros do Clube | **P0** | JUR | Definir comissão e responsabilidade | 5 contratos assinados | Contratos com cláusula de qualidade |
| 24 | Estruturar o processo de reclamação de parceiro | **P0** | ATE | Proteger a marca | Fluxo com prazo de resposta | Tempo de resposta < 24 h |
| 25 | Publicar 15 conteúdos e 4 textos de blog | P1 | CONT | Iniciar o motor B | 19 peças | Sessões orgânicas |

---

## Primeiros 60 dias — consertar o que o dado mostrou

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 26 | Revisar as premissas da Etapa 9 com dados reais | **P0** | LID + DIR | Refazer o modelo com verdade | Modelo atualizado | Desvio da premissa por linha |
| 27 | Implementar os gatilhos 5 a 10 | P1 | TEC | Cobrir a fase de compra grande | 6 gatilhos ativos | Conversão por gatilho |
| 28 | Ativar a extração de pendências do laudo por IA | P1 | TEC | Alimentar o bloqueio comercial | Etiquetas geradas | Precisão > 90% em amostra |
| 29 | Implementar o bloqueio de recomendação em pendência aberta | **P0** | TEC | Impedir o pior erro possível | Regra ativa | Falsos positivos = 0 |
| 30 | Fechar mais 5 parceiros do Clube | P1 | PAR | Ampliar o motor de margem | 10 parceiros ativos | Serviços fechados/mês |
| 31 | Primeira conciliação formal de comissões | **P0** | LID | Saber o que de fato entrou | Relatório conciliado | Divergência < 5% |
| 32 | Publicar a página de kit indexável (`/loja/kit/<id>/`) | P2 | TEC | Ganhar busca orgânica | 18 páginas | Posições no Google |

---

## Primeiros 90 dias — decidir se continua

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 33 | **Comitê de decisão do trimestre** | **P0** | DIR | Seguir, ajustar ou encerrar | Decisão registrada em ata | Ver critérios abaixo |
| 34 | Auditoria de imparcialidade do laudo | **P0** | DIR + JUR | Verificar se a loja contaminou a vistoria | Relatório de auditoria | Zero ocorrência |
| 35 | Sincronizar favoritos com o cadastro do cliente | P1 | TEC | Unificar a lista de compras | Sincronização ativa | % de listas sincronizadas |
| 36 | Lançar o sistema de avaliações de cliente verificado | P1 | TEC + ATE | Prova social honesta | Avaliações no ar | Nº de avaliações verificadas |
| 37 | Estruturar cashback do Clube (crédito pós-confirmação) | P1 | TEC + JUR | Fidelizar sem risco financeiro | Regra publicada | Saldo creditado x confirmado |
| 38 | Primeira parceria com construtora ou imobiliária | P1 | DIR | Testar o B2B2C | 1 acordo piloto | Unidades alcançadas |
| 39 | Reavaliar todos os parceiros por reclamação e prazo | **P0** | CUR | Fazer a curadoria valer | Lista revisada | Parceiros removidos |

### Critérios objetivos do comitê dos 90 dias

| Indicador | Seguir | Ajustar | Encerrar |
|---|---|---|---|
| Clientes FN que visitaram a loja | > 45% | 25–45% | < 25% |
| Cliques de saída no mês 3 | > 800 | 300–800 | < 300 |
| Comissões confirmadas acumuladas | > R$ 6 mil | R$ 2–6 mil | < R$ 2 mil |
| Parceiros do Clube ativos | ≥ 8 | 4–7 | < 4 |
| Ocorrências de conflito com o laudo | 0 | 0 | ≥ 1 **(encerra sozinho)** |

A última linha não é negociável e não admite ponderação: se a loja começar a contaminar a
imparcialidade da vistoria, ela é encerrada, independentemente de quanto esteja faturando. O
laudo é o negócio; a loja é a extensão.

---

## Primeiros 180 dias — escalar o que funcionou

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 40 | Contratar o analista de parcerias dedicado | P1 | DIR | Profissionalizar o motor C | Contratação feita | Serviços fechados/mês |
| 41 | Chegar a 20 parceiros ativos no Clube | P1 | PAR | Cobrir todas as categorias de serviço | 20 acordos | Cobertura por categoria |
| 42 | Lançar as landings por momento (`/loja/momento/<id>/`) | P1 | TEC + CONT | Capturar busca de cauda longa | 6 páginas | Sessões orgânicas por página |
| 43 | Programa de indicação entre clientes | P2 | TEC | Crescer sem mídia paga | Programa no ar | Indicações fechadas |
| 44 | Segunda parceria com construtora | P1 | DIR | Validar a repetibilidade do B2B2C | 2 acordos ativos | Unidades/mês |
| 45 | **Avaliar expansão ou licenciamento** (decisão da Etapa 9) | **P0** | DIR | Romper o teto do mercado regional | Estudo com 3 praças candidatas | Decisão registrada |
| 46 | Revisão jurídica semestral | **P0** | JUR | Manter conformidade | Parecer atualizado | Não conformidades = 0 |
| 47 | Auditoria de acessibilidade e desempenho da loja | P2 | TEC | Não perder cliente por página lenta | Relatório e correções | Core Web Vitals verdes |

---

## Primeiro ano — consolidar a unidade

| # | Tarefa | P | Resp. | Objetivo | Resultado esperado | Indicador |
|---|---|---|---|---|---|---|
| 48 | Campanha de aniversário de chaves (gatilho 17) para a primeira coorte | **P0** | ATE | Fechar o ciclo e devolver ao serviço técnico | Campanha rodando | Vistorias de fim de garantia contratadas |
| 49 | Fechar o ano com 30 parceiros ativos no Clube | P1 | PAR | Consolidar o motor de margem | 30 acordos | Receita do motor C |
| 50 | Lançar a primeira praça de expansão ou o primeiro licenciado | P1 | DIR | Romper o teto regional | 1 praça operando | Receita fora de PE |
| 51 | Publicar o relatório anual de transparência da curadoria | P2 | LID | Transformar honestidade em marca | Relatório publicado | Repercussão e imprensa |
| 52 | Revisar o catálogo inteiro com 12 meses de dados | P1 | CUR | Cortar a cauda morta | Catálogo revisado | % de itens com clique no ano |
| 53 | Definir o plano de 24 meses com números reais | **P0** | DIR + LID | Substituir projeção por histórico | Plano aprovado | Aderência ao realizado |
| 54 | Avaliar a constituição da loja como empresa própria do grupo | **P0** | DIR + JUR | Decisão societária | Parecer e decisão | Ver Etapa Final |

---

## Organização das primeiras 12 semanas (visão de Gantt)

```
Semana        1  2  3  4  5  6  7  8  9 10 11 12
Afiliados     ███████
Jurídico      ██████████
FN Club          ████████████████████████████████
Conteúdo         ██████████████████████████████████
Automação              ██████████████████████████
Medição       ███  ██████████████████████████████
Validação        ██████████                 ██████   ← entrevistas e comitê dos 90 dias
```
