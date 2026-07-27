# Etapa 3 — Os 300 produtos, por categoria e prioridade

> Documento gerado por `npm run docs:catalogo` a partir de `src/dados/catalogo.js` e
> `src/dados/kits.js` — as mesmas fontes que alimentam a loja em produção. Não edite
> este arquivo à mão: edite o dado e rode o comando de novo.


O catálogo de lançamento tem **300 produtos** em **19 categorias**. A regra de entrada é uma só: o item precisa aparecer na rotina real de quem acabou de receber um apartamento. Comissão não é critério de entrada — é critério de esforço de mídia depois que o item já provou que é útil.

## Como ler as métricas

| Métrica | O que significa na prática |
|---|---|
| **Ticket** | Faixa de preço observada no varejo brasileiro para os itens da categoria. Indicativa: a loja não controla preço. |
| **Comissão** | Faixa realista dos programas de afiliados para a categoria. É a receita bruta da FN por venda. |
| **Recompra** | Chance de o mesmo cliente comprar de novo dentro de 12 meses. É o que separa categoria de aquisição de categoria de retenção. |
| **Facilidade** | Quanto esforço de convencimento a venda exige. Alta = o cliente já quer, só precisa saber onde. |
| **Logística** | Atrito de entrega e instalação. Importa porque atrito de terceiro respinga na reputação da FN. |
| **Risco** | Combinação de risco reputacional, jurídico e de devolução. |


## Resumo do portfólio

| # | Categoria | Itens | Ticket | Comissão | Recompra | Facilidade | Logística | Risco |
|---|---|---|---|---|---|---|---|---|
| 1 | **Segurança e fechaduras** | 15 | R$ 80 a R$ 1,6 mil | 5–9% | Baixa | Alta | Simples, exceto instalação | Médio |
| 2 | **Climatização e conforto térmico** | 15 | R$ 130 a R$ 5,2 mil | 3–6% | Baixa | Alta | Volumosa e com instalação | Alto |
| 3 | **Hidráulica e áreas molhadas** | 16 | R$ 15 a R$ 1,5 mil | 4–8% | Média | Alta | Simples | Baixo |
| 4 | **Elétrica, energia e proteção** | 16 | R$ 20 a R$ 900 | 4–8% | Média | Alta | Simples | Baixo |
| 5 | **Cozinha — eletroportáteis** | 17 | R$ 35 a R$ 2,5 mil | 3–6% | Alta | Alta | Simples | Baixo |
| 6 | **Cozinha — utensílios e mesa** | 18 | R$ 30 a R$ 900 | 4–10% | Alta | Alta | Simples | Baixo |
| 7 | **Organização e armazenamento** | 18 | R$ 25 a R$ 450 | 6–14% | Alta | Alta | Simples | Baixo |
| 8 | **Eletrodomésticos de linha branca** | 14 | R$ 350 a R$ 8 mil | 1,5–4% | Baixa | Média | Volumosa, com agendamento | Alto |
| 9 | **Iluminação** | 16 | R$ 15 a R$ 700 | 4–10% | Alta | Alta | Simples | Baixo |
| 10 | **Cama, mesa e banho** | 16 | R$ 35 a R$ 4 mil | 3–8% | Alta | Alta | Mista (colchão é volumoso) | Médio |
| 11 | **Banheiro** | 16 | R$ 25 a R$ 3,5 mil | 5–15% | Média | Alta | Sob medida, com instalação | Médio |
| 12 | **Móveis essenciais** | 16 | R$ 120 a R$ 4,5 mil | 4–10% | Baixa | Média | Volumosa, prazo longo, montagem | Alto |
| 13 | **Ferramentas e instalação** | 17 | R$ 20 a R$ 800 | 3–8% | Média | Alta | Simples | Baixo |
| 14 | **Lavanderia e cuidado com roupas** | 15 | R$ 25 a R$ 900 | 5–10% | Média | Alta | Simples | Baixo |
| 15 | **Casa inteligente** | 16 | R$ 60 a R$ 3 mil | 3–8% | Alta | Média | Simples | Médio |
| 16 | **Limpeza e manutenção** | 14 | R$ 25 a R$ 1,5 mil | 4–10% | Alta | Alta | Simples | Baixo |
| 17 | **Decoração e acabamento** | 16 | R$ 25 a R$ 1,2 mil | 5–12% | Média | Média | Mista | Médio |
| 18 | **Varanda e área externa** | 15 | R$ 45 a R$ 12 mil | 5–12% | Baixa | Média | Sob medida, com instalação | Médio |
| 19 | **Home office** | 14 | R$ 30 a R$ 2 mil | 3–8% | Média | Média | Simples | Baixo |

**Distribuição por prioridade de curadoria:** A — Lançamento — 106 itens · B — Segunda onda — 122 itens · C — Cauda longa — 72 itens

**Distribuição por momento da jornada:** Dia das chaves — 68 · Primeira semana — 55 · Primeiro mês — 81 · Até 3 meses — 73 · Até 6 meses — 23

**Concentração por parceiro** (risco de dependência — nenhum deve passar de ~30%):

| Parceiro | Itens | Participação |
|---|---|---|
| Shopee | 83 | 27.7% |
| Magalu | 60 | 20.0% |
| Leroy Merlin | 44 | 14.7% |
| MadeiraMadeira | 37 | 12.3% |
| Amazon | 36 | 12.0% |
| Mercado Livre | 30 | 10.0% |
| AliExpress | 5 | 1.7% |
| Parceiro do FN Club | 5 | 1.7% |

---

## Catálogo completo

### 1. Segurança e fechaduras

**Por que esta categoria existe (visão de portfólio).** É a única categoria em que a FN fala de dentro do laudo: quem acabou de receber um apartamento com porta de entrada padrão da construtora tem uma dor concreta e datada. Ticket médio alto para o esforço, decisão rápida e quase nenhuma concorrência de curadoria séria.

**O que dizemos ao cliente.** A porta que a construtora entrega vem com a fechadura mais barata que passa na norma, e a chave dela circulou pela obra inteira. Trocar o miolo ou instalar fechadura digital é a primeira coisa que recomendamos a quem recebe as chaves.

**Alerta de curadoria.** Fechadura digital exige furação correta na porta — mal instalada, ela trava com você do lado de fora. Vale contratar instalação com quem já fez isso antes.

**Regra interna.** Fechadura mal instalada gera chamado. Sempre oferecer instalador do FN Club junto.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 80 a R$ 1,6 mil | 5–9% | Baixa | Alta | Simples, exceto instalação | Médio | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Câmera de segurança interna Wi-Fi | A | R$ 120 a R$ 450 | Primeira semana | Amazon |
| 2 | Detector de fumaça autônomo com bateria | A | R$ 70 a R$ 250 | Primeira semana | Amazon |
| 3 | Detector de vazamento de gás com alarme | A | R$ 90 a R$ 300 | Primeira semana | Mercado Livre |
| 4 | Extintor ABC 1kg com suporte de parede | A | R$ 90 a R$ 220 | Primeira semana | Leroy Merlin |
| 5 | Fechadura digital com senha e biometria | A | R$ 450 a R$ 1,6 mil | Dia das chaves | Mercado Livre |
| 6 | Fechadura digital com tag e aplicativo | A | R$ 380 a R$ 1,2 mil | Dia das chaves | Shopee |
| 7 | Câmera externa Wi-Fi com visão noturna | B | R$ 180 a R$ 600 | Primeiro mês | Amazon |
| 8 | Olho mágico digital com visor e gravação | B | R$ 220 a R$ 700 | Primeira semana | Mercado Livre |
| 9 | Sensor de abertura para porta e janela | B | R$ 60 a R$ 180 | Primeiro mês | Shopee |
| 10 | Sensor de presença com sirene | B | R$ 80 a R$ 250 | Primeiro mês | Shopee |
| 11 | Trava de segurança para janela de correr | B | R$ 25 a R$ 90 | Primeira semana | Shopee |
| 12 | Vídeo porteiro Wi-Fi para apartamento | B | R$ 350 a R$ 1,1 mil | Primeiro mês | Mercado Livre |
| 13 | Cofre digital de embutir | C | R$ 250 a R$ 800 | Até 3 meses | Magalu |
| 14 | Corrente e trava auxiliar de porta | C | R$ 30 a R$ 110 | Primeira semana | Leroy Merlin |
| 15 | Trava de proteção para gavetas e armários | C | R$ 20 a R$ 70 | Até 3 meses | Shopee |

### 2. Climatização e conforto térmico

**Por que esta categoria existe (visão de portfólio).** Maior ticket do primeiro trimestre e item que praticamente todo apartamento novo no Nordeste compra. A FN já sabe, pelo laudo, se a unidade tem infraestrutura de dreno e ponto elétrico — isso transforma uma recomendação genérica em consultoria, que é o nosso diferencial.

**O que dizemos ao cliente.** Em Pernambuco, ar-condicionado não é luxo. A questão é comprar o aparelho certo para o cômodo certo — e usar a infraestrutura que a construtora já deixou pronta, em vez de quebrar parede depois.

**Alerta de curadoria.** Não escolha BTU no chute. Confira a área do cômodo, a incidência de sol, o ponto elétrico e o dreno deixados pela construtora. Se você tem laudo da FN, esses dados estão nele.

**Regra interna.** Nunca recomendar BTU sem os dados da unidade. Erro de dimensionamento vira reclamação da FN.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 130 a R$ 5,2 mil | 3–6% | Baixa | Alta | Volumosa e com instalação | Alto | Primeiro mês |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Ar-condicionado split inverter 12.000 BTUs | A | R$ 2,2 mil a R$ 3,9 mil | Primeiro mês | Magalu |
| 2 | Ar-condicionado split inverter 9.000 BTUs | A | R$ 1,8 mil a R$ 3,2 mil | Primeiro mês | Magalu |
| 3 | Ventilador de coluna silencioso | A | R$ 150 a R$ 500 | Dia das chaves | Amazon |
| 4 | Ventilador de teto com controle remoto | A | R$ 250 a R$ 900 | Primeiro mês | Magalu |
| 5 | Ar-condicionado split inverter 18.000 BTUs | B | R$ 3 mil a R$ 5,2 mil | Até 3 meses | Magalu |
| 6 | Circulador de ar de mesa | B | R$ 130 a R$ 420 | Primeira semana | Amazon |
| 7 | Cortina blackout com forro térmico | B | R$ 90 a R$ 400 | Primeiro mês | Shopee |
| 8 | Desumidificador de ar para ambiente fechado | B | R$ 300 a R$ 1,5 mil | Até 6 meses | Amazon |
| 9 | Kit de instalação com tubulação de cobre | B | R$ 180 a R$ 500 | Primeiro mês | MadeiraMadeira |
| 10 | Película de controle solar para vidro | B | R$ 60 a R$ 300 | Primeiro mês | Mercado Livre |
| 11 | Suporte de parede para condensadora | B | R$ 90 a R$ 260 | Primeiro mês | Leroy Merlin |
| 12 | Aquecedor elétrico portátil | C | R$ 120 a R$ 500 | Até 6 meses | Magalu |
| 13 | Climatizador de ar evaporativo | C | R$ 350 a R$ 1,2 mil | Até 3 meses | Magalu |
| 14 | Purificador de ar com filtro HEPA | C | R$ 400 a R$ 1,8 mil | Até 6 meses | Amazon |
| 15 | Termo-higrômetro digital de ambiente | C | R$ 30 a R$ 120 | Primeiro mês | Shopee |

### 3. Hidráulica e áreas molhadas

**Por que esta categoria existe (visão de portfólio).** Nasce direto das não conformidades do laudo: ralo, sifão, vedação, ducha higiênica ausente. É a categoria onde a recomendação FN tem autoridade técnica inquestionável e o cliente compra no mesmo dia, porque a dor é imediata.

**O que dizemos ao cliente.** São os itens que mais aparecem como pendência nas nossas vistorias: sifão que vaza, ralo que cheira, vedação malfeita e a ducha higiênica que quase nunca vem. Resolver na primeira semana custa pouco e evita infiltração.

**Alerta de curadoria.** Antes de comprar, confira se a pendência não é obrigação da construtora corrigir dentro da garantia. Se estiver no laudo, cobre — não compre.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 15 a R$ 1,5 mil | 4–8% | Média | Alta | Simples | Baixo | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Chuveiro elétrico multitemperatura | A | R$ 120 a R$ 450 | Dia das chaves | Magalu |
| 2 | Ducha higiênica com registro e suporte | A | R$ 90 a R$ 350 | Primeira semana | Leroy Merlin |
| 3 | Filtro de água para torneira | A | R$ 70 a R$ 260 | Primeira semana | Mercado Livre |
| 4 | Kit de vedação: veda-rosca, silicone e fita | A | R$ 25 a R$ 90 | Dia das chaves | Leroy Merlin |
| 5 | Mangueira flexível para vaso e pia | A | R$ 20 a R$ 80 | Dia das chaves | Leroy Merlin |
| 6 | Purificador de água refrigerado | A | R$ 400 a R$ 1,5 mil | Primeiro mês | Magalu |
| 7 | Sifão flexível universal para pia | A | R$ 20 a R$ 70 | Dia das chaves | Leroy Merlin |
| 8 | Assento sanitário com fechamento suave | B | R$ 90 a R$ 350 | Primeiro mês | MadeiraMadeira |
| 9 | Ducha pressurizada com aquecimento | B | R$ 250 a R$ 900 | Primeiro mês | Leroy Merlin |
| 10 | Misturador monocomando para lavatório | B | R$ 130 a R$ 600 | Até 3 meses | MadeiraMadeira |
| 11 | Registro de gaveta com acabamento | B | R$ 60 a R$ 250 | Até 3 meses | Leroy Merlin |
| 12 | Torneira gourmet com bica flexível | B | R$ 150 a R$ 700 | Primeiro mês | MadeiraMadeira |
| 13 | Válvula de escoamento com ralo click | B | R$ 30 a R$ 120 | Primeira semana | Leroy Merlin |
| 14 | Aerador economizador para torneira | C | R$ 15 a R$ 60 | Até 3 meses | Shopee |
| 15 | Bomba pressurizadora para chuveiro | C | R$ 400 a R$ 1,4 mil | Até 6 meses | Mercado Livre |
| 16 | Ralo linear em inox para box | C | R$ 80 a R$ 350 | Até 3 meses | MadeiraMadeira |

### 4. Elétrica, energia e proteção

**Por que esta categoria existe (visão de portfólio).** Baixo ticket, altíssima facilidade e recompra real. Protege os eletrodomésticos que o cliente acabou de comprar — argumento que se vende sozinho e ancora bem no laudo elétrico.

**O que dizemos ao cliente.** Você acabou de colocar geladeira, TV e ar-condicionado novos em uma instalação que nunca foi testada com carga. Proteção contra surto é o item mais barato desta loja e o que evita o prejuízo mais caro.

**Alerta de curadoria.** Filtro de linha comum não protege contra raio: procure o que informa capacidade de absorção em joules. Para o ar-condicionado, o protetor precisa ser dimensionado para a corrente dele.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 20 a R$ 900 | 4–8% | Média | Alta | Simples | Baixo | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Extensão elétrica reforçada de 5 metros | A | R$ 35 a R$ 130 | Dia das chaves | Shopee |
| 2 | Filtro de linha com proteção contra surto | A | R$ 40 a R$ 160 | Dia das chaves | Amazon |
| 3 | Kit de adaptadores de tomada padrão brasileiro | A | R$ 20 a R$ 70 | Dia das chaves | Shopee |
| 4 | Protetor de surto para ar-condicionado | A | R$ 60 a R$ 220 | Primeiro mês | Mercado Livre |
| 5 | Testador de tomada e sequência de fase | A | R$ 30 a R$ 120 | Dia das chaves | Mercado Livre |
| 6 | Cabo HDMI 2.1 de 2 metros | B | R$ 25 a R$ 90 | Primeira semana | Shopee |
| 7 | Canaleta e organizador de fios adesivo | B | R$ 25 a R$ 100 | Primeira semana | Shopee |
| 8 | Disjuntor DR e DPS para quadro de distribuição | B | R$ 90 a R$ 350 | Primeiro mês | Leroy Merlin |
| 9 | Estabilizador para eletrodomésticos | B | R$ 120 a R$ 400 | Primeira semana | Mercado Livre |
| 10 | Interruptor inteligente Wi-Fi | B | R$ 60 a R$ 220 | Até 3 meses | Shopee |
| 11 | Régua de tomadas com portas USB | B | R$ 50 a R$ 190 | Primeira semana | Amazon |
| 12 | Tomada de parede com carregador USB | B | R$ 40 a R$ 150 | Primeiro mês | Leroy Merlin |
| 13 | Kit de cabos, conectores e fita isolante | C | R$ 40 a R$ 160 | Até 3 meses | Leroy Merlin |
| 14 | Medidor de consumo de energia de tomada | C | R$ 60 a R$ 220 | Até 6 meses | AliExpress |
| 15 | Multímetro digital para uso doméstico | C | R$ 45 a R$ 180 | Até 3 meses | Amazon |
| 16 | Nobreak para modem e roteador | C | R$ 250 a R$ 900 | Até 6 meses | Amazon |

### 5. Cozinha — eletroportáteis

**Por que esta categoria existe (visão de portfólio).** Categoria de entrada do e-commerce brasileiro: o cliente já compraria de qualquer jeito, a questão é onde. Alta frequência, decisão rápida e ótimo desempenho em conteúdo curto.

**O que dizemos ao cliente.** A cozinha é o primeiro cômodo a funcionar de verdade. Estes são os aparelhos que a gente vê em uso em todo apartamento que visita — e não os vinte que a internet manda comprar.

**Alerta de curadoria.** Some a potência do que vai ficar ligado ao mesmo tempo na bancada. Muitos apartamentos novos entregam poucas tomadas na cozinha, e o disjuntor desarma.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 35 a R$ 2,5 mil | 3–6% | Alta | Alta | Simples | Baixo | Primeira semana |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Air fryer de 4 litros | A | R$ 250 a R$ 700 | Primeira semana | Magalu |
| 2 | Cafeteira elétrica com jarra de vidro | A | R$ 120 a R$ 500 | Primeira semana | Amazon |
| 3 | Liquidificador de alta rotação | A | R$ 120 a R$ 500 | Primeira semana | Magalu |
| 4 | Micro-ondas 20 a 30 litros | A | R$ 450 a R$ 1,2 mil | Dia das chaves | Magalu |
| 5 | Air fryer forno de 12 litros | B | R$ 500 a R$ 1,5 mil | Até 3 meses | Magalu |
| 6 | Batedeira planetária com tigela | B | R$ 250 a R$ 1,2 mil | Primeiro mês | Magalu |
| 7 | Cafeteira de cápsula | B | R$ 250 a R$ 900 | Primeiro mês | Magalu |
| 8 | Chaleira elétrica com controle de temperatura | B | R$ 90 a R$ 400 | Primeiro mês | Amazon |
| 9 | Garrafa térmica com bomba de pressão | B | R$ 60 a R$ 250 | Primeira semana | Shopee |
| 10 | Mixer de mão com acessórios | B | R$ 90 a R$ 400 | Primeiro mês | Amazon |
| 11 | Sanduicheira e grill elétrico | B | R$ 90 a R$ 300 | Primeira semana | Magalu |
| 12 | Adega climatizada compacta | C | R$ 700 a R$ 2,5 mil | Até 6 meses | Magalu |
| 13 | Balança digital de cozinha | C | R$ 35 a R$ 130 | Primeiro mês | Shopee |
| 14 | Espremedor de frutas elétrico | C | R$ 80 a R$ 300 | Até 3 meses | Magalu |
| 15 | Panela elétrica de arroz | C | R$ 150 a R$ 500 | Até 3 meses | Mercado Livre |
| 16 | Processador de alimentos multifunção | C | R$ 200 a R$ 800 | Até 3 meses | Magalu |
| 17 | Torradeira elétrica | C | R$ 90 a R$ 350 | Até 3 meses | Magalu |

### 6. Cozinha — utensílios e mesa

**Por que esta categoria existe (visão de portfólio).** Ticket individual baixo, mas é a categoria que mais entra em kit. Serve como recheio de cesta e eleva o valor do pedido sem elevar o esforço de venda.

**O que dizemos ao cliente.** Ninguém muda para um apartamento com a cozinha montada. Esta é a lista curta do que entra em uso na primeira semana, sem o excesso que fica guardado no armário para sempre.

**Alerta de curadoria.** Se o seu cooktop for de indução, panela comum não funciona: confira se o fundo é magnético antes de comprar o jogo.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 30 a R$ 900 | 4–10% | Alta | Alta | Simples | Baixo | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Aparelho de jantar com 20 a 30 peças | A | R$ 150 a R$ 700 | Dia das chaves | Magalu |
| 2 | Escorredor de louça em inox | A | R$ 70 a R$ 260 | Dia das chaves | Mercado Livre |
| 3 | Faqueiro inox com 24 peças | A | R$ 90 a R$ 400 | Dia das chaves | Magalu |
| 4 | Frigideira antiaderente de 24 cm | A | R$ 60 a R$ 280 | Dia das chaves | Amazon |
| 5 | Jogo de facas com cepo de madeira | A | R$ 80 a R$ 450 | Primeira semana | Amazon |
| 6 | Jogo de panelas antiaderente com 5 peças | A | R$ 200 a R$ 900 | Dia das chaves | Magalu |
| 7 | Kit com 10 potes herméticos para mantimentos | A | R$ 80 a R$ 320 | Primeira semana | Shopee |
| 8 | Kit com 3 tábuas de corte | A | R$ 40 a R$ 160 | Dia das chaves | Shopee |
| 9 | Lixeira de pia com tampa basculante | A | R$ 40 a R$ 160 | Dia das chaves | Shopee |
| 10 | Panela de pressão de 4,5 litros | A | R$ 120 a R$ 500 | Primeira semana | Magalu |
| 11 | Jogo de copos e taças de vidro | B | R$ 60 a R$ 300 | Primeira semana | Shopee |
| 12 | Jogo de tigelas de vidro com tampa | B | R$ 60 a R$ 250 | Primeiro mês | Mercado Livre |
| 13 | Kit de assadeiras e formas antiaderentes | B | R$ 60 a R$ 250 | Primeiro mês | Mercado Livre |
| 14 | Kit de utensílios de silicone para antiaderente | B | R$ 45 a R$ 180 | Primeira semana | Shopee |
| 15 | Peneira, funil e escorredor de macarrão | B | R$ 35 a R$ 140 | Primeira semana | Shopee |
| 16 | Ralador, descascador e abridor em kit | B | R$ 30 a R$ 120 | Dia das chaves | Shopee |
| 17 | Suporte de papel-toalha com porta-detergente | B | R$ 35 a R$ 140 | Dia das chaves | Shopee |
| 18 | Porta-temperos giratório para bancada | C | R$ 50 a R$ 200 | Primeiro mês | Shopee |

### 7. Organização e armazenamento

**Por que esta categoria existe (visão de portfólio).** Conteúdo de organização é o formato de maior alcance orgânico em vídeo curto no Brasil. Comissão percentual alta, produto barato, devolução baixa: é a categoria que sustenta volume de cliques enquanto as categorias de ticket alto maturam.

**O que dizemos ao cliente.** Armário de apartamento novo é sempre menor do que parecia na planta. Organização é o que faz o espaço render — e custa uma fração de qualquer marcenaria planejada.

**Alerta de curadoria.** Meça a profundidade útil do armário antes, não a largura da porta. É onde quase todo mundo erra e acaba com caixa que não entra.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 25 a R$ 450 | 6–14% | Alta | Alta | Simples | Baixo | Primeira semana |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Kit com 30 cabides de veludo antideslizante | A | R$ 50 a R$ 200 | Dia das chaves | Shopee |
| 2 | Kit de caixas organizadoras transparentes | A | R$ 60 a R$ 250 | Primeira semana | Shopee |
| 3 | Kit de ganchos adesivos de alta fixação | A | R$ 25 a R$ 100 | Dia das chaves | Shopee |
| 4 | Kit organizador modular para armário | A | R$ 60 a R$ 250 | Primeira semana | Shopee |
| 5 | Organizador colmeia para gavetas | A | R$ 30 a R$ 120 | Primeira semana | Shopee |
| 6 | Sapateira vertical para closet | A | R$ 70 a R$ 300 | Primeira semana | Magalu |
| 7 | Arara de roupas com rodízios | B | R$ 90 a R$ 350 | Primeiro mês | Shopee |
| 8 | Carrinho organizador de 3 andares | B | R$ 90 a R$ 350 | Primeiro mês | Mercado Livre |
| 9 | Divisórias ajustáveis para prateleira | B | R$ 40 a R$ 160 | Primeiro mês | Shopee |
| 10 | Kit com 3 nichos de parede | B | R$ 70 a R$ 300 | Primeiro mês | MadeiraMadeira |
| 11 | Organizador de banheiro com ventosa | B | R$ 25 a R$ 100 | Primeira semana | Shopee |
| 12 | Organizador escalonado para despensa | B | R$ 40 a R$ 160 | Primeiro mês | Shopee |
| 13 | Organizador plano para embaixo da cama | B | R$ 45 a R$ 180 | Primeiro mês | Shopee |
| 14 | Pasta sanfonada para documentos do imóvel | B | R$ 35 a R$ 140 | Primeira semana | Amazon |
| 15 | Baú organizador com tampa e assento | C | R$ 120 a R$ 450 | Até 3 meses | MadeiraMadeira |
| 16 | Cesto organizador de brinquedos | C | R$ 50 a R$ 200 | Até 3 meses | Shopee |
| 17 | Etiquetadora portátil com fitas | C | R$ 60 a R$ 250 | Até 3 meses | Amazon |
| 18 | Organizador suspenso para bolsas | C | R$ 35 a R$ 140 | Até 3 meses | Shopee |

### 8. Eletrodomésticos de linha branca

**Por que esta categoria existe (visão de portfólio).** Onde está o dinheiro do cliente: sozinha responde por perto da metade do orçamento de montar o apartamento. Comissão percentual baixa, mas o valor absoluto por conversão é o maior do catálogo. Exige curadoria de medidas — e medida é o que a FN tem no laudo.

**O que dizemos ao cliente.** É onde vai a maior parte do seu orçamento. Vale escolher com calma, olhando consumo e medida — e não só o preço da vitrine.

**Alerta de curadoria.** Meça o vão de embutir, a porta de entrada e o elevador antes de fechar. Geladeira que não passa na porta é a devolução mais comum do varejo brasileiro.

**Regra interna.** Checar vão de embutir e porta de entrada antes de recomendar. É a causa nº 1 de devolução.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 350 a R$ 8 mil | 1,5–4% | Baixa | Média | Volumosa, com agendamento | Alto | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Fogão de 4 bocas com forno | A | R$ 700 a R$ 1,8 mil | Dia das chaves | Magalu |
| 2 | Geladeira frost free de 300 a 400 litros | A | R$ 2 mil a R$ 4,5 mil | Dia das chaves | Magalu |
| 3 | Máquina de lavar de 11 a 14 kg | A | R$ 1,6 mil a R$ 3,5 mil | Dia das chaves | Magalu |
| 4 | Smart TV 50 polegadas 4K | A | R$ 1,7 mil a R$ 3,5 mil | Primeiro mês | Magalu |
| 5 | Coifa ou depurador de parede | B | R$ 400 a R$ 2,5 mil | Primeiro mês | MadeiraMadeira |
| 6 | Cooktop de indução com 4 bocas | B | R$ 900 a R$ 3 mil | Primeiro mês | Magalu |
| 7 | Fogão de 5 bocas com forno autolimpante | B | R$ 1 mil a R$ 2,8 mil | Dia das chaves | Magalu |
| 8 | Forno elétrico de embutir | B | R$ 1,2 mil a R$ 3,5 mil | Até 3 meses | Magalu |
| 9 | Geladeira duplex inverter acima de 450 litros | B | R$ 3,5 mil a R$ 8 mil | Primeiro mês | Magalu |
| 10 | Lava e seca de 11 kg | B | R$ 3 mil a R$ 7 mil | Primeiro mês | Magalu |
| 11 | Lava-louças de 8 a 14 serviços | B | R$ 2,2 mil a R$ 5,5 mil | Até 3 meses | Magalu |
| 12 | Micro-ondas de embutir | C | R$ 900 a R$ 2,5 mil | Até 3 meses | Magalu |
| 13 | Secadora de roupas | C | R$ 1,8 mil a R$ 4,5 mil | Até 6 meses | Magalu |
| 14 | Soundbar para televisão | C | R$ 350 a R$ 1,8 mil | Até 3 meses | Amazon |

### 9. Iluminação

**Por que esta categoria existe (visão de portfólio).** Apartamento novo é entregue com ponto de luz pendurado. Necessidade universal, ticket acessível, e o cliente compra várias vezes ao longo do primeiro ano conforme mobilia.

**O que dizemos ao cliente.** O apartamento é entregue com um fio pendurado em cada cômodo. Iluminação é a mudança mais barata que transforma a sensação do imóvel inteiro.

**Alerta de curadoria.** Confira se o ponto de luz tem a caixa e o suporte adequados antes de comprar luminária pesada. Plafon parafusado no gesso sem reforço cai.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 15 a R$ 700 | 4–10% | Alta | Alta | Simples | Baixo | Primeira semana |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Kit com 10 lâmpadas LED bulbo de 9W | A | R$ 45 a R$ 140 | Dia das chaves | Shopee |
| 2 | Lâmpada LED inteligente RGB Wi-Fi | A | R$ 35 a R$ 120 | Primeira semana | Shopee |
| 3 | Plafon LED de sobrepor de 24W | A | R$ 60 a R$ 220 | Primeira semana | Leroy Merlin |
| 4 | Arandela de parede para interior | B | R$ 70 a R$ 320 | Até 3 meses | MadeiraMadeira |
| 5 | Fita LED de 5 metros com fonte | B | R$ 40 a R$ 160 | Primeiro mês | Shopee |
| 6 | Kit de painéis LED de embutir 18W | B | R$ 80 a R$ 260 | Primeiro mês | Leroy Merlin |
| 7 | Luminária pendente para bancada | B | R$ 90 a R$ 450 | Primeiro mês | MadeiraMadeira |
| 8 | Luz de emergência com bateria recarregável | B | R$ 45 a R$ 160 | Primeira semana | Mercado Livre |
| 9 | Sensor de presença para iluminação | B | R$ 40 a R$ 150 | Até 3 meses | Leroy Merlin |
| 10 | Spot LED de embutir direcionável | B | R$ 25 a R$ 90 | Primeiro mês | Leroy Merlin |
| 11 | Trilho eletrificado com spots | B | R$ 150 a R$ 600 | Até 3 meses | Leroy Merlin |
| 12 | Abajur de mesa com cúpula | C | R$ 60 a R$ 300 | Até 3 meses | Magalu |
| 13 | Dimmer de parede para LED | C | R$ 45 a R$ 180 | Até 3 meses | Leroy Merlin |
| 14 | Lâmpada para forno e geladeira | C | R$ 15 a R$ 60 | Até 3 meses | Shopee |
| 15 | Luminária de piso para sala | C | R$ 150 a R$ 700 | Até 6 meses | MadeiraMadeira |
| 16 | Perfil de alumínio para fita LED | C | R$ 35 a R$ 140 | Até 3 meses | Mercado Livre |

### 10. Cama, mesa e banho

**Por que esta categoria existe (visão de portfólio).** Compra obrigatória da primeira noite e uma das poucas com recompra previsível dentro dos 12 meses. Colchão e base puxam o ticket da categoria para cima.

**O que dizemos ao cliente.** É a compra da primeira noite, e a que mais se arrepende quem escolhe às pressas. Colchão bom dura dez anos; colchão errado, você troca em dois.

**Alerta de curadoria.** Confira a medida real da cama antes: queen e king mudam de fabricante para fabricante, e a roupa de cama errada não tem troca depois de aberta.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 35 a R$ 4 mil | 3–8% | Alta | Alta | Mista (colchão é volumoso) | Médio | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Base box queen | A | R$ 600 a R$ 2,2 mil | Dia das chaves | Magalu |
| 2 | Colchão queen de molas ensacadas | A | R$ 1,2 mil a R$ 4 mil | Dia das chaves | Magalu |
| 3 | Edredom ou duvet queen | A | R$ 150 a R$ 700 | Primeira semana | Magalu |
| 4 | Jogo de 5 toalhas de banho | A | R$ 90 a R$ 400 | Dia das chaves | Magalu |
| 5 | Jogo de cama queen de 200 fios | A | R$ 90 a R$ 400 | Dia das chaves | Magalu |
| 6 | Par de travesseiros antialérgicos | A | R$ 90 a R$ 400 | Dia das chaves | Amazon |
| 7 | Protetor de colchão impermeável | A | R$ 70 a R$ 280 | Dia das chaves | Magalu |
| 8 | Capa de travesseiro impermeável | B | R$ 35 a R$ 140 | Primeira semana | Shopee |
| 9 | Cobre-leito matelassado | B | R$ 120 a R$ 500 | Até 3 meses | Magalu |
| 10 | Colchão de solteiro em espuma D33 | B | R$ 400 a R$ 1,5 mil | Primeiro mês | Magalu |
| 11 | Jogo de cama king em percal 400 fios | B | R$ 200 a R$ 800 | Primeiro mês | Magalu |
| 12 | Kit com 4 almofadas decorativas e capas | B | R$ 70 a R$ 280 | Primeiro mês | Shopee |
| 13 | Kit de toalhas de rosto e lavabo | B | R$ 45 a R$ 180 | Primeira semana | Shopee |
| 14 | Manta decorativa para sofá | B | R$ 60 a R$ 250 | Primeiro mês | Shopee |
| 15 | Kit com 6 jogos americanos | C | R$ 40 a R$ 160 | Primeiro mês | Shopee |
| 16 | Toalha de mesa para jantar | C | R$ 60 a R$ 250 | Até 3 meses | Shopee |

### 11. Banheiro

**Por que esta categoria existe (visão de portfólio).** Box e espelho são as duas primeiras compras de acabamento de quase toda unidade nova, e ambas são serviço com medida — território natural do FN Club, com comissão negociada direto e sem depender de marketplace.

**O que dizemos ao cliente.** Box e espelho são as duas primeiras compras de acabamento de quase todo apartamento novo. Ambas dependem de medida no local — e é aí que vale ter alguém de confiança.

**Alerta de curadoria.** Box de vidro é sob medida e não tem devolução. Confira se a construtora entregou o desnível e o ralo na posição do projeto antes de mandar medir.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 25 a R$ 3,5 mil | 5–15% | Média | Alta | Sob medida, com instalação | Médio | Primeiro mês |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Box de vidro temperado sob medida | A | R$ 900 a R$ 3,5 mil | Primeiro mês | Parceiro do FN Club |
| 2 | Escova sanitária com suporte fechado | A | R$ 25 a R$ 100 | Dia das chaves | Shopee |
| 3 | Espelho com LED e sistema antiembaçante | A | R$ 250 a R$ 1,2 mil | Primeiro mês | MadeiraMadeira |
| 4 | Gabinete de banheiro com cuba | A | R$ 400 a R$ 1,8 mil | Primeiro mês | MadeiraMadeira |
| 5 | Kit de acessórios de banheiro com 5 peças | A | R$ 70 a R$ 300 | Dia das chaves | Shopee |
| 6 | Lixeira de banheiro com pedal | A | R$ 40 a R$ 160 | Dia das chaves | Shopee |
| 7 | Porta-toalha de parede | A | R$ 45 a R$ 180 | Primeira semana | Leroy Merlin |
| 8 | Tapete antiderrapante para box | A | R$ 30 a R$ 120 | Dia das chaves | Shopee |
| 9 | Armário aéreo com espelho | B | R$ 200 a R$ 800 | Primeiro mês | MadeiraMadeira |
| 10 | Cortina de box impermeável com ganchos | B | R$ 35 a R$ 140 | Dia das chaves | Shopee |
| 11 | Cuba de apoio para bancada | B | R$ 120 a R$ 600 | Primeiro mês | MadeiraMadeira |
| 12 | Kit de tapetes de banheiro antiderrapantes | B | R$ 50 a R$ 200 | Dia das chaves | Magalu |
| 13 | Organizador de chuveiro em inox | B | R$ 60 a R$ 250 | Primeira semana | Mercado Livre |
| 14 | Suporte de papel higiênico com prateleira | B | R$ 40 a R$ 160 | Primeira semana | Shopee |
| 15 | Dispenser automático de sabonete | C | R$ 60 a R$ 250 | Até 3 meses | Amazon |
| 16 | Toalheiro elétrico aquecido | C | R$ 250 a R$ 900 | Até 6 meses | Mercado Livre |

### 12. Móveis essenciais

**Por que esta categoria existe (visão de portfólio).** Segundo maior bolso do cliente. Comissão percentual média, mas o valor absoluto é alto e MadeiraMadeira remunera bem. Requer o maior cuidado de curadoria: montagem e prazo são a origem mais comum de frustração.

**O que dizemos ao cliente.** Depois dos eletrodomésticos, é o maior gasto. Também é onde mais se perde tempo: prazo longo, montagem complicada e peça que não cabe no elevador.

**Alerta de curadoria.** Confira o prazo de entrega e se a montagem está inclusa antes de finalizar. Atraso de móvel é a reclamação mais comum do setor — e ninguém avisa antes.

**Regra interna.** Só recomendar vendedor com prazo publicado e montagem inclusa. Prazo estourado vira dor da FN.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 120 a R$ 4,5 mil | 4–10% | Baixa | Média | Volumosa, prazo longo, montagem | Alto | Primeiro mês |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Armário de cozinha modulado | A | R$ 800 a R$ 3,5 mil | Primeiro mês | MadeiraMadeira |
| 2 | Guarda-roupa de casal com 6 portas | A | R$ 900 a R$ 3 mil | Dia das chaves | MadeiraMadeira |
| 3 | Mesa de jantar com 4 a 6 cadeiras | A | R$ 700 a R$ 3 mil | Primeiro mês | MadeiraMadeira |
| 4 | Rack para TV de até 65 polegadas | A | R$ 350 a R$ 1,5 mil | Dia das chaves | MadeiraMadeira |
| 5 | Sofá compacto de 2 lugares | A | R$ 700 a R$ 2,5 mil | Dia das chaves | MadeiraMadeira |
| 6 | Sofá retrátil e reclinável de 3 lugares | A | R$ 1,2 mil a R$ 4,5 mil | Primeiro mês | MadeiraMadeira |
| 7 | Balcão e gabinete para pia de cozinha | B | R$ 400 a R$ 1,6 mil | Primeiro mês | MadeiraMadeira |
| 8 | Cabeceira estofada para cama | B | R$ 250 a R$ 1,2 mil | Até 3 meses | MadeiraMadeira |
| 9 | Cômoda com gavetas | B | R$ 350 a R$ 1,4 mil | Primeiro mês | MadeiraMadeira |
| 10 | Painel para TV com prateleiras | B | R$ 300 a R$ 1,2 mil | Primeiro mês | MadeiraMadeira |
| 11 | Par de banquetas altas para bancada | B | R$ 200 a R$ 800 | Primeiro mês | MadeiraMadeira |
| 12 | Par de criados-mudos | B | R$ 200 a R$ 800 | Dia das chaves | MadeiraMadeira |
| 13 | Estante para livros e objetos | C | R$ 250 a R$ 1 mil | Até 3 meses | MadeiraMadeira |
| 14 | Mesa de centro e mesa lateral | C | R$ 150 a R$ 700 | Até 3 meses | MadeiraMadeira |
| 15 | Poltrona decorativa para quarto | C | R$ 400 a R$ 1,8 mil | Até 6 meses | MadeiraMadeira |
| 16 | Puff e banco baú | C | R$ 120 a R$ 500 | Até 3 meses | MadeiraMadeira |

### 13. Ferramentas e instalação

**Por que esta categoria existe (visão de portfólio).** A categoria mais coerente com a marca: quem confia na FN para vistoriar confia para dizer qual furadeira comprar. Ticket baixo, decisão rápida, e é o item que o cliente descobre que precisa exatamente no dia em que recebe as chaves.

**O que dizemos ao cliente.** Você vai precisar furar parede na primeira semana. A pergunta não é se, é com o quê — e se você sabe o que tem atrás daquele ponto da parede.

**Alerta de curadoria.** Use o detector antes de furar. Em apartamento novo, eletroduto e tubulação passam onde você não imagina, e furar um cano embutido é um prejuízo de milhares de reais.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 20 a R$ 800 | 3–8% | Média | Alta | Simples | Baixo | Dia das chaves |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Cola de montagem e silicone neutro | A | R$ 25 a R$ 100 | Dia das chaves | Leroy Merlin |
| 2 | Detector de fiação e metal na parede | A | R$ 90 a R$ 350 | Dia das chaves | Amazon |
| 3 | Escada doméstica de 5 degraus | A | R$ 150 a R$ 600 | Primeira semana | Leroy Merlin |
| 4 | Fita isolante e fita crepe em kit | A | R$ 20 a R$ 80 | Dia das chaves | Leroy Merlin |
| 5 | Furadeira e parafusadeira de impacto | A | R$ 200 a R$ 800 | Dia das chaves | Leroy Merlin |
| 6 | Jogo de chaves de fenda e Philips | A | R$ 35 a R$ 140 | Dia das chaves | Shopee |
| 7 | Kit de brocas para concreto e cerâmica | A | R$ 40 a R$ 160 | Dia das chaves | Leroy Merlin |
| 8 | Kit de buchas e parafusos sortidos | A | R$ 30 a R$ 120 | Dia das chaves | Leroy Merlin |
| 9 | Martelo, alicate e chave inglesa em kit | A | R$ 60 a R$ 250 | Dia das chaves | Leroy Merlin |
| 10 | Trena manual de 5 metros | A | R$ 20 a R$ 80 | Dia das chaves | Leroy Merlin |
| 11 | Kit de reparo de parede com massa e espátula | B | R$ 40 a R$ 160 | Primeiro mês | Leroy Merlin |
| 12 | Maleta de ferramentas com 100 peças | B | R$ 150 a R$ 600 | Primeira semana | Magalu |
| 13 | Nível a laser autonivelante | B | R$ 150 a R$ 600 | Primeiro mês | Amazon |
| 14 | Óculos de proteção e luvas de trabalho | B | R$ 30 a R$ 120 | Dia das chaves | Leroy Merlin |
| 15 | Rolo, pincel e bandeja para pintura | B | R$ 45 a R$ 180 | Primeiro mês | Leroy Merlin |
| 16 | Trena a laser de 20 metros | B | R$ 90 a R$ 350 | Primeira semana | Amazon |
| 17 | Serra tico-tico ou serrote manual | C | R$ 150 a R$ 600 | Até 3 meses | Leroy Merlin |

### 14. Lavanderia e cuidado com roupas

**Por que esta categoria existe (visão de portfólio).** Área de serviço de apartamento novo é apertada e mal resolvida de fábrica. Categoria de solução, não de desejo: converte por utilidade e tem recompra em consumíveis.

**O que dizemos ao cliente.** A área de serviço é o cômodo que a construtora mais aperta. Resolver bem esse metro e meio muda a rotina da casa toda.

**Alerta de curadoria.** Confira o ponto de água, o dreno e a tomada da máquina antes de comprar. Extensão em máquina de lavar é risco de incêndio, não é solução.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 25 a R$ 900 | 5–10% | Média | Alta | Simples | Baixo | Primeira semana |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Cesto para roupa suja com tampa | A | R$ 45 a R$ 180 | Dia das chaves | Shopee |
| 2 | Ferro de passar a vapor | A | R$ 90 a R$ 350 | Primeira semana | Magalu |
| 3 | Kit com 50 cabides e prendedores | A | R$ 30 a R$ 120 | Dia das chaves | Shopee |
| 4 | Tábua de passar com capa térmica | A | R$ 90 a R$ 350 | Primeira semana | Magalu |
| 5 | Varal de chão dobrável | A | R$ 70 a R$ 280 | Dia das chaves | Shopee |
| 6 | Varal de teto retrátil para área de serviço | A | R$ 90 a R$ 350 | Primeira semana | Leroy Merlin |
| 7 | Armário multiuso para área de serviço | B | R$ 250 a R$ 900 | Primeiro mês | MadeiraMadeira |
| 8 | Base com rodízios para máquina de lavar | B | R$ 80 a R$ 300 | Primeiro mês | Shopee |
| 9 | Cesto de roupa com divisórias | B | R$ 70 a R$ 260 | Primeiro mês | Mercado Livre |
| 10 | Kit de mangueira e vedação para máquina | B | R$ 30 a R$ 120 | Dia das chaves | Leroy Merlin |
| 11 | Prateleira e organizador sobre a máquina | B | R$ 90 a R$ 350 | Primeiro mês | Mercado Livre |
| 12 | Vaporizador vertical de roupas | B | R$ 150 a R$ 600 | Primeiro mês | Amazon |
| 13 | Removedor de bolinhas de tecido | C | R$ 30 a R$ 120 | Até 3 meses | Shopee |
| 14 | Sacos protetores para lavagem delicada | C | R$ 25 a R$ 90 | Primeiro mês | Shopee |
| 15 | Tanque auxiliar com esfregador | C | R$ 120 a R$ 450 | Até 3 meses | Leroy Merlin |

### 15. Casa inteligente

**Por que esta categoria existe (visão de portfólio).** Categoria de maior valor de marca: posiciona a FN como referência técnica moderna e gera o melhor conteúdo de YouTube. Conversão menor, mas o cliente que entra aqui volta várias vezes.

**O que dizemos ao cliente.** Automação bem escolhida resolve coisas chatas de apartamento: luz, tomada e fechadura sem obra. Mal escolhida, vira gaveta cheia de aparelho que ninguém usa.

**Alerta de curadoria.** Prefira produto com aplicativo em português e suporte no Brasil. E teste o sinal do Wi-Fi no ponto onde o dispositivo vai ficar: parede de concreto derruba sinal.

**Regra interna.** Evitar produto sem suporte em português. Suporte ruim de terceiro respinga na FN.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 60 a R$ 3 mil | 3–8% | Alta | Média | Simples | Médio | Até 3 meses |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Fechadura inteligente com aplicativo | A | R$ 500 a R$ 1,8 mil | Primeiro mês | Mercado Livre |
| 2 | Kit com 2 tomadas inteligentes Wi-Fi | A | R$ 60 a R$ 250 | Primeira semana | Shopee |
| 3 | Kit com 4 lâmpadas inteligentes | A | R$ 90 a R$ 350 | Primeira semana | Shopee |
| 4 | Repetidor de sinal Wi-Fi | A | R$ 90 a R$ 350 | Dia das chaves | Mercado Livre |
| 5 | Roteador Wi-Fi 6 em kit mesh com 2 unidades | A | R$ 350 a R$ 1,2 mil | Dia das chaves | Amazon |
| 6 | Aparelho de streaming 4K | B | R$ 200 a R$ 700 | Primeiro mês | Amazon |
| 7 | Assistente de voz com tela | B | R$ 250 a R$ 900 | Até 3 meses | Amazon |
| 8 | Campainha inteligente com câmera | B | R$ 250 a R$ 900 | Até 3 meses | Amazon |
| 9 | Controle universal infravermelho Wi-Fi | B | R$ 90 a R$ 300 | Primeiro mês | AliExpress |
| 10 | Robô aspirador com mapeamento | B | R$ 700 a R$ 3 mil | Até 3 meses | Magalu |
| 11 | Smart speaker compacto | B | R$ 150 a R$ 500 | Até 3 meses | Amazon |
| 12 | Cabo de rede e adaptador powerline | C | R$ 60 a R$ 250 | Até 3 meses | Mercado Livre |
| 13 | Hub Zigbee para automação | C | R$ 150 a R$ 600 | Até 6 meses | AliExpress |
| 14 | Motor para automatizar cortina | C | R$ 400 a R$ 1,6 mil | Até 6 meses | AliExpress |
| 15 | Robô aspirador compacto de entrada | C | R$ 400 a R$ 1,2 mil | Até 3 meses | Shopee |
| 16 | Sensor de temperatura e umidade Zigbee | C | R$ 60 a R$ 250 | Até 3 meses | AliExpress |

### 16. Limpeza e manutenção

**Por que esta categoria existe (visão de portfólio).** A categoria de maior recompra do catálogo e a melhor porta para assinatura futura. Ticket baixo, risco quase nulo, e é o que mantém a loja relevante no mês 8, quando as compras grandes já acabaram.

**O que dizemos ao cliente.** Apartamento recém-entregue vem com poeira de obra, respingo de rejunte e resíduo de argamassa. Produto errado risca porcelanato novo, e risco em porcelanato não sai.

**Alerta de curadoria.** Nada de ácido ou abrasivo no porcelanato e no inox da primeira limpeza. Comece sempre pelo produto mais neutro.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 25 a R$ 1,5 mil | 4–10% | Alta | Alta | Simples | Baixo | Primeira semana |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Antimofo e removedor para armários | A | R$ 25 a R$ 100 | Primeira semana | Shopee |
| 2 | Aspirador de pó vertical sem fio | A | R$ 300 a R$ 1,5 mil | Primeira semana | Magalu |
| 3 | Desentupidor e limpa-ralo | A | R$ 25 a R$ 100 | Dia das chaves | Shopee |
| 4 | Kit com 10 panos de microfibra | A | R$ 30 a R$ 120 | Dia das chaves | Shopee |
| 5 | Kit com rodo, vassoura e pá | A | R$ 45 a R$ 180 | Dia das chaves | Shopee |
| 6 | Kit de limpeza para vidros e box | A | R$ 40 a R$ 160 | Dia das chaves | Shopee |
| 7 | Mop giratório com balde | A | R$ 90 a R$ 350 | Dia das chaves | Shopee |
| 8 | Balde espremedor com organizador | B | R$ 60 a R$ 250 | Primeira semana | Shopee |
| 9 | Kit de manutenção e renovação de rejunte | B | R$ 40 a R$ 160 | Até 3 meses | Leroy Merlin |
| 10 | Lavadora de alta pressão | B | R$ 350 a R$ 1,2 mil | Até 3 meses | Leroy Merlin |
| 11 | Lixeiras e organizador de reciclagem | B | R$ 45 a R$ 180 | Primeira semana | Shopee |
| 12 | Aspirador de pó e água | C | R$ 300 a R$ 1,2 mil | Até 3 meses | Leroy Merlin |
| 13 | Limpador telescópico para teto e ventilador | C | R$ 40 a R$ 160 | Até 3 meses | Shopee |
| 14 | Vaporizador de limpeza doméstica | C | R$ 250 a R$ 900 | Até 6 meses | Magalu |

### 17. Decoração e acabamento

**Por que esta categoria existe (visão de portfólio).** Entra depois que o essencial está resolvido. Cortina sob medida é o item de maior comissão negociada da lista e casa perfeitamente com parceiro local do FN Club.

**O que dizemos ao cliente.** Depois que o essencial funciona, é o que faz o apartamento parecer seu. Cortina é o item que mais muda a percepção do ambiente — e o que mais se erra na medida.

**Alerta de curadoria.** Meça a largura do vão mais a folga de cada lado e a altura até o teto antes de encomendar. Cortina sob medida não tem troca.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 25 a R$ 1,2 mil | 5–12% | Média | Média | Mista | Médio | Até 3 meses |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Cortinas e persianas sob medida | A | R$ 200 a R$ 1,2 mil | Primeiro mês | Parceiro do FN Club |
| 2 | Suporte de parede articulado para TV | A | R$ 60 a R$ 250 | Dia das chaves | Mercado Livre |
| 3 | Tapete de sala 2,00 x 1,50 m | A | R$ 150 a R$ 800 | Primeiro mês | Magalu |
| 4 | Trilho e varão para cortina | A | R$ 60 a R$ 250 | Primeiro mês | Leroy Merlin |
| 5 | Espelho decorativo de corpo inteiro | B | R$ 200 a R$ 900 | Até 3 meses | MadeiraMadeira |
| 6 | Kit com 3 quadros decorativos | B | R$ 70 a R$ 300 | Até 3 meses | Shopee |
| 7 | Kit de fixação para pendurar quadros | B | R$ 25 a R$ 100 | Primeira semana | Shopee |
| 8 | Papel de parede autoadesivo | B | R$ 60 a R$ 250 | Até 3 meses | Shopee |
| 9 | Persiana rolô blackout | B | R$ 90 a R$ 400 | Primeiro mês | Mercado Livre |
| 10 | Rodapé e acabamento em poliestireno | B | R$ 90 a R$ 400 | Até 3 meses | Leroy Merlin |
| 11 | Adesivo decorativo para porta e armário | C | R$ 40 a R$ 160 | Até 3 meses | Shopee |
| 12 | Cestos e mantas decorativas | C | R$ 60 a R$ 250 | Até 3 meses | Shopee |
| 13 | Difusor de ambiente e velas aromáticas | C | R$ 40 a R$ 160 | Até 3 meses | Shopee |
| 14 | Prateleira decorativa com iluminação | C | R$ 90 a R$ 400 | Até 6 meses | Mercado Livre |
| 15 | Relógio de parede | C | R$ 40 a R$ 180 | Até 3 meses | Shopee |
| 16 | Vasos decorativos com plantas artificiais | C | R$ 50 a R$ 250 | Até 3 meses | Shopee |

### 18. Varanda e área externa

**Por que esta categoria existe (visão de portfólio).** Rede de proteção é compra de urgência para quem tem criança ou pet, e acontece na primeira semana. O resto da categoria é upgrade de médio prazo com ticket alto (fechamento em vidro).

**O que dizemos ao cliente.** Se você tem criança pequena ou animal, rede de proteção é a primeira coisa a instalar — antes mesmo da mudança entrar. O resto da varanda pode esperar.

**Alerta de curadoria.** Rede de proteção é item de segurança da vida. Só instale com empresa que emita nota fiscal do serviço e dê garantia por escrito, e confira as regras do seu condomínio antes.

**Regra interna.** Rede de proteção é item de segurança infantil: só parceiro com instalação certificada.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 45 a R$ 12 mil | 5–12% | Baixa | Média | Sob medida, com instalação | Médio | Até 3 meses |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Rede de proteção para varanda com instalação | A | R$ 300 a R$ 1,2 mil | Dia das chaves | Parceiro do FN Club |
| 2 | Tela de proteção para janelas | A | R$ 200 a R$ 800 | Dia das chaves | Parceiro do FN Club |
| 3 | Churrasqueira elétrica para varanda | B | R$ 250 a R$ 900 | Até 3 meses | Magalu |
| 4 | Conjunto de mesa e cadeiras para varanda | B | R$ 400 a R$ 2 mil | Até 3 meses | MadeiraMadeira |
| 5 | Deck modular de madeira para varanda | B | R$ 150 a R$ 700 | Até 3 meses | Leroy Merlin |
| 6 | Fechamento de varanda em vidro | B | R$ 3 mil a R$ 12 mil | Até 6 meses | Parceiro do FN Club |
| 7 | Iluminação de varanda à prova de tempo | B | R$ 90 a R$ 400 | Até 3 meses | Leroy Merlin |
| 8 | Varal de parede para área externa | B | R$ 70 a R$ 280 | Primeira semana | Leroy Merlin |
| 9 | Vasos e floreiras com suporte | B | R$ 70 a R$ 300 | Até 3 meses | Shopee |
| 10 | Cortina de vidro retrátil e toldo | C | R$ 300 a R$ 1,5 mil | Até 6 meses | Mercado Livre |
| 11 | Grama sintética para varanda | C | R$ 90 a R$ 400 | Até 3 meses | Mercado Livre |
| 12 | Kit de jardinagem com substrato | C | R$ 45 a R$ 180 | Até 3 meses | Leroy Merlin |
| 13 | Ombrelone e guarda-sol | C | R$ 200 a R$ 800 | Até 6 meses | Magalu |
| 14 | Persiana externa de bambu | C | R$ 120 a R$ 500 | Até 6 meses | Shopee |
| 15 | Poltrona para área externa | C | R$ 250 a R$ 1,2 mil | Até 3 meses | MadeiraMadeira |

### 19. Home office

**Por que esta categoria existe (visão de portfólio).** Recorte menor, mas com ticket saudável e público fiel: o comprador de apartamento de 1 e 2 quartos hoje quase sempre monta um canto de trabalho. Boa categoria para conteúdo de nicho.

**O que dizemos ao cliente.** Quase todo apartamento novo de 1 ou 2 quartos precisa acomodar um canto de trabalho. Cadeira boa é o item que faz diferença de verdade — o resto é acessório.

**Alerta de curadoria.** Meça o espaço com a cadeira puxada para trás, não só a mesa. É o erro mais comum em quarto pequeno.

| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |
|---|---|---|---|---|---|---|
| R$ 30 a R$ 2 mil | 3–8% | Média | Média | Simples | Baixo | Primeiro mês |

| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |
|---|---|---|---|---|---|
| 1 | Cadeira de escritório ergonômica | A | R$ 400 a R$ 2 mil | Primeiro mês | Magalu |
| 2 | Mesa de escritório compacta | A | R$ 250 a R$ 1 mil | Primeiro mês | MadeiraMadeira |
| 3 | Luminária de mesa com luz ajustável | B | R$ 70 a R$ 300 | Primeiro mês | Amazon |
| 4 | Monitor de 24 a 27 polegadas | B | R$ 600 a R$ 2 mil | Até 3 meses | Magalu |
| 5 | Organizador de cabos para mesa | B | R$ 30 a R$ 120 | Primeiro mês | Shopee |
| 6 | Suporte para monitor e notebook | B | R$ 60 a R$ 250 | Primeiro mês | Amazon |
| 7 | Teclado e mouse sem fio | B | R$ 90 a R$ 350 | Primeiro mês | Amazon |
| 8 | Apoio de pés ergonômico | C | R$ 60 a R$ 250 | Até 3 meses | Amazon |
| 9 | Gaveteiro e arquivo para escritório | C | R$ 200 a R$ 800 | Até 6 meses | MadeiraMadeira |
| 10 | Headset com cancelamento de ruído | C | R$ 200 a R$ 1,2 mil | Até 3 meses | Amazon |
| 11 | Impressora multifuncional tanque de tinta | C | R$ 700 a R$ 1,8 mil | Até 6 meses | Magalu |
| 12 | Nobreak para computador | C | R$ 350 a R$ 1,2 mil | Até 6 meses | Mercado Livre |
| 13 | Painel acústico decorativo | C | R$ 90 a R$ 400 | Até 6 meses | Shopee |
| 14 | Webcam Full HD | C | R$ 120 a R$ 450 | Até 3 meses | Amazon |
