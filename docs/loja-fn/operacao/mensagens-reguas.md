# Mensagens prontas da régua de automação

Os 18 gatilhos da Etapa 8, com o texto de cada mensagem. `D+n` conta a partir da entrega das
chaves. `{{nome}}`, `{{empreendimento}}` e afins são variáveis do sistema.

**Três regras que valem para tudo aqui:**

1. **Máximo de 2 mensagens por semana por cliente**, somando todos os canais.
2. **WhatsApp só nos gatilhos de alto valor** (1, 2, 5, 9, 10, 17, 18). WhatsApp queimado não se
   recupera.
3. **O gatilho 9 nunca leva link comercial.** É o que dá autoridade aos outros dezessete.

**Sobre o tom:** curto, sem emoji em excesso, sem "Olá, tudo bem?" seguido de três parágrafos.
Quem acabou de receber apartamento está ocupado. Mensagem que vai direto ao ponto é respeitosa,
não fria.

---

## Fase quente — do dia 0 ao dia 45

### Gatilho 1 · `laudo_entregue` — D+0, 2h após o envio do laudo · WhatsApp

```
{{nome}}, seu laudo da vistoria do {{empreendimento}} já está no sistema, com as fotos e
o que a construtora precisa corrigir.

Duas coisas que vale olhar hoje ainda:

1. As pendências marcadas como responsabilidade da construtora — não gaste dinheiro com
essas, elas são obrigação dela.

2. Se você vai dormir aí essa semana, montamos uma lista curta do que costuma faltar na
primeira noite: {{link_kit_primeira_noite}}

Qualquer dúvida sobre o laudo, é só chamar aqui.
```

> Por que funciona: entrega valor antes de qualquer link, e o primeiro item **tira** dinheiro da
> mesa. Isso compra o direito de mandar o segundo.

### Gatilho 2 · `primeira_noite` — D+2 · WhatsApp

```
{{nome}}, tudo certo com a mudança?

Se ainda não montou nada, o que a gente vê fazendo mais falta na primeira noite é isso
aqui: colchão, roupa de cama, lâmpada, extensão e o básico de limpeza.

Lista completa: {{link_kit_primeira_noite}}

(A gente ganha comissão se você comprar por esses links, e o preço para você é o mesmo.)
```

### Gatilho 3 · `mudanca` — D+5 · E-mail

**Assunto:** `Os 7 primeiros dias no apartamento novo`

```
{{nome}},

A primeira semana no imóvel novo é sempre a mesma coisa: você descobre a cada hora que
falta alguma coisa, faz três pedidos diferentes e paga frete três vezes.

Montamos a lista do que quase todo mundo esquece — organização, limpeza, ferramentas
básicas e os itens de instalação que a construtora não deixa prontos.

Ver a lista: {{link_kit_primeira_mudanca}}

Se aparecer alguma dúvida técnica sobre o imóvel, pode chamar a gente no WhatsApp.

Equipe FN Edificações
```

### Gatilho 4 · `ferramentas` — D+8 · Notificação + e-mail

**Assunto:** `Antes de furar a primeira parede`

```
{{nome}},

Um aviso que vale mais que qualquer produto: em apartamento novo, eletroduto e tubulação
passam onde você não imagina. Furar um cano embutido custa caro e dá muito trabalho.

Use um detector de fiação antes. Custa pouco e resolve.

O kit básico de quem vai morar em apartamento: {{link_kit_ferramentas}}
```

### Gatilho 5 · `climatizacao` — D+20 · WhatsApp

```
{{nome}}, uma orientação com base na vistoria da sua unidade.

Seu {{comodo}} tem cerca de {{area}} m² e janela para o {{orientacao}}. Pela nossa conta,
a faixa indicada fica em torno de {{btus}} BTUs — abaixo disso o aparelho trabalha
forçado e não gela direito.

A construtora deixou {{tem_dreno}} ponto de dreno e {{tem_ponto}} ponto elétrico
dedicado, então {{observacao_instalacao}}.

Modelos nessa faixa: {{link_kit_climatizacao}}
Se quiser, indico um instalador do FN Club que já atendeu clientes nossos.
```

> Esta é **a mensagem mais valiosa da régua inteira**. Nenhum marketplace consegue enviá-la,
> porque nenhum sabe o tamanho do cômodo do cliente. É consultoria, não anúncio.

### Gatilho 6 · `medidas` — D+25 · E-mail

**Assunto:** `As medidas da sua unidade, para comprar móvel sem errar`

```
{{nome}},

Anotamos algumas medidas da sua unidade durante a vistoria. Guarde antes de comprar
móvel:

· Vão da porta de entrada: {{vao_porta}}
· Vão do box do banheiro: {{vao_box}}
· Espaço do armário de cozinha: {{vao_cozinha}}

O erro mais comum do varejo de móveis no Brasil é sofá que não passa na porta e geladeira
que não entra no vão. Meça antes de fechar — e confira se a montagem está inclusa.

Móveis com prazo publicado e montagem: {{link_kit_sala}}
```

### Gatilho 7 · `banheiro` — D+35 · E-mail

**Assunto:** `Box e espelho: o que perguntar antes de fechar`

```
{{nome}},

Box de vidro é sob medida e não tem devolução. Antes de mandar medir, confira se a
construtora entregou o desnível e o ralo na posição do projeto — se estiver errado, é ela
quem corrige, e você economiza o serviço.

Se estiver tudo certo, temos um vidraceiro no FN Club com preço negociado para nossos
clientes: {{link_clube_vidracaria}}

Resto do banheiro: {{link_kit_banheiro}}
```

---

## Fase morna — do dia 46 ao dia 120

### Gatilho 8 · `organizacao` — D+50 · Notificação

```
Armário de apartamento novo é sempre menor do que parecia na planta. Antes de comprar
mais móvel, vale organizar o que já tem: {{link_kit_organizacao}}
```

### Gatilho 9 · `pendencia_construtora` — D+45, se houver pendência aberta · WhatsApp

```
{{nome}}, passando para saber da pendência que ficou aberta na sua vistoria:

"{{descricao_pendencia}}"

A construtora já resolveu? Se ainda não, o caminho é abrir chamado formal na assistência
técnica dela, por escrito, anexando a página do laudo com a foto e a norma. Vale guardar
o protocolo.

Se ela negar ou enrolar, me avisa que a gente te orienta como cobrar.
```

> **Sem link comercial. Nenhum.** Esta é a mensagem que sustenta a credibilidade das outras
> dezessete — e o momento em que o cliente decide se a FN está do lado dele.

### Gatilho 10 · `avaliacao` — D+60 · WhatsApp

```
{{nome}}, dois meses de chave! Como está o apartamento?

Se puder responder duas perguntas rápidas, ajuda muito a gente:

1. A vistoria te ajudou a cobrar a construtora?
2. Tem alguma coisa que a gente devia ter avisado e não avisou?

E se você conhece alguém recebendo apartamento agora, a indicação é o que mais faz a
gente crescer.
```

### Gatilho 11 · `decoracao` — D+75 · E-mail

**Assunto:** `Como ficou um apartamento parecido com o seu`

```
{{nome}},

Um apartamento de {{area_similar}} m², parecido com o seu, seis meses depois da entrega —
com o custo de cada parte declarado.

Ver o antes e depois: {{link_conteudo}}

Cortina é o item que mais muda a percepção do ambiente, e o que mais se erra na medida:
meça a largura do vão mais a folga de cada lado, e a altura até o teto, antes de
encomendar. Sob medida não tem troca.
```

### Gatilho 12 · `silencio` — D+90 a D+170

**Nenhuma mensagem comercial.** Cadência cai para **1 e-mail por mês, só de conteúdo técnico.**

> Silêncio aqui é decisão de produto, não falha de execução. O cliente já comprou o que precisava;
> insistir nesta fase é o caminho mais rápido para o descadastro — e para perder o gatilho 17,
> que é o mais valioso de todos.

---

## Fase de manutenção — do dia 121 ao dia 365

### Gatilho 13 · `manutencao_ar` — D+180 · Notificação

```
Seis meses de uso: é a hora da primeira limpeza do ar-condicionado. Filtro sujo gasta
mais energia e piora a qualidade do ar.

Fazer com um técnico do FN Club: {{link_clube_climatizacao}}
Ou os filtros e produtos para fazer você mesmo: {{link_filtros}}
```

### Gatilho 14 · `chuva` — sazonal (abril a julho) · E-mail para toda a base local

**Assunto:** `Começou a chuva: três pontos para conferir no seu apartamento`

```
{{nome}},

Período de chuva em Pernambuco é quando aparecem os problemas de vedação que ninguém vê
no verão. Três coisas que vale conferir esse mês:

1. Rejunte do box e do rodapé da área molhada
2. Vedação das esquadrias — principalmente na face que pega chuva de vento
3. Armários encostados na parede externa, por causa de mofo

Se aparecer infiltração e seu imóvel ainda estiver na garantia, isso é obrigação da
construtora. Guarde foto com data e nos chame antes de contratar qualquer conserto.

Produtos de manutenção e antimofo: {{link_kit_manutencao}}
```

### Gatilho 15 · `lista_parada` — 14 dias após favoritar sem clicar · E-mail

**Assunto:** `Sua lista continua salva`

```
{{nome}},

Você salvou {{quantidade}} itens na sua lista da Loja FN. Eles continuam lá quando você
precisar: {{link_lista}}

Sem pressa — a gente não trabalha com contagem regressiva nem com "últimas unidades".
```

> A última frase é de propósito. É diferenciação de marca em uma linha, e custa nada.

### Gatilho 16 · `preco_caiu` — quando um favorito entra em promoção · Notificação

```
Um item da sua lista está mais barato hoje no {{parceiro}}: {{produto}}.

Vale conferir se o desconto é real — o preço válido é sempre o que aparecer no site
dele: {{link}}
```

### Gatilho 17 · `aniversario_chaves` — D+330 · WhatsApp + e-mail

**Assunto:** `Um ano de chave: o que ainda dá para exigir`

```
{{nome}}, faz quase um ano que você recebeu as chaves do {{empreendimento}}.

Esse é o momento em que costumam aparecer problemas que não davam para ver na entrega:
infiltração, trinca, rejunte soltando, esquadria desalinhada. Muitos desses ainda estão
cobertos pela garantia da construtora — mas só se forem registrados a tempo.

Vale fazer uma verificação agora, antes de vencer prazo. A gente faz vistoria de fim de
garantia e monta o laudo para você cobrar.

Quer que eu veja uma data? {{link_agendamento}}
```

> **É o gatilho mais valioso do ciclo, e não é da loja — é da FN.** A loja passou o ano mantendo
> o relacionamento vivo para que esta mensagem chegasse a alguém que ainda lembra e confia.
> Devolve o cliente ao serviço técnico, que é o de maior margem do grupo.

### Gatilho 18 · `indicacao` — D+100, se o cliente avaliou bem · WhatsApp

```
{{nome}}, que bom que a vistoria ajudou.

Um pedido: se você conhece alguém que vai receber apartamento nos próximos meses, manda o
nosso contato. A hora certa de falar com a gente é antes do aceite — depois de assinar,
fica muito mais difícil cobrar a construtora.

É assim que a gente cresce, e a gente agradece de verdade.
```

---

## Checklist antes de ligar a régua

- [ ] Variáveis do sistema mapeadas (`{{nome}}`, `{{empreendimento}}`, `{{area}}`, medidas)
- [ ] Regra de contenção implementada: máximo 2 mensagens/semana por cliente
- [ ] **Bloqueio de categoria com pendência aberta funcionando** (Etapa 8, item 8.1)
- [ ] Gatilho 9 configurado **sem** nenhum link comercial
- [ ] Descadastro em um toque em todos os canais, com honra imediata
- [ ] WhatsApp pela API oficial — não oficial é banimento certo
- [ ] Verificar se os programas de afiliados permitem link em WhatsApp e e-mail (vários restringem)
- [ ] Teste com 10 clientes reais antes de ligar para a base inteira
