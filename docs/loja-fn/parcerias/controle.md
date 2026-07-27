# Controle de credenciamento

Tabela de acompanhamento. Atualize conforme avança — é o que evita perder prazo de recurso e
esquecer de pedir o nome do parâmetro de subid.

## Status por programa

| # | Programa | Via | Status | Data do envio | ID de afiliado | `tag` | `subid` | Comissão confirmada | Próxima ação |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Mercado Livre | Direto | ☐ Não iniciado | | | | | | Cadastrar |
| 2 | Magalu | Direto | ☐ Não iniciado | | | | | | Cadastrar |
| 3 | Leroy Merlin | Rakuten Advertising | ☐ Não iniciado | | | | | | Cadastrar na rede |
| 4 | MadeiraMadeira | Awin (ou Lomadee) | ☐ Não iniciado | | | | | | Cadastrar na rede |
| 5 | Casas Bahia | Awin (exige CNPJ) | ☐ Não iniciado | | | | | | Cadastrar na rede |
| 6 | Shopee | Direto | ☐ Não iniciado | | | | | | Cadastrar |
| 7 | Amazon | Direto | ☐ Aguardar tráfego | | | | | | Só após ter volume |
| 8 | AliExpress | Portal próprio | ☐ Baixa prioridade | | | | | | Mês 2 |
| 9 | Carrefour | Rede | ☐ Baixa prioridade | | | | | | Mês 2 |
| — | ~~Mercado Pago Shops~~ | — | ✗ Não aplicável | | | | | | Não é programa de afiliados |

**Legenda de status:** ☐ Não iniciado · ⏳ Enviado · ⚠ Reprovado (recurso) · ✓ Aprovado · ● Ativo e gerando

## Cadastro nas redes (fazer uma vez, serve para vários varejistas)

| Rede | Status | Login | Varejistas do nosso interesse |
|---|---|---|---|
| Awin | ☐ | | Casas Bahia, MadeiraMadeira |
| Rakuten Advertising | ☐ | | Leroy Merlin |
| Lomadee | ☐ | | MadeiraMadeira (alternativa) |

## Pendências que bloqueiam o envio

- [ ] CNPJ e razão social preenchidos em `loja/transparencia/index.html`
- [ ] E-mail para requisições de titular (LGPD) preenchido
- [ ] Encarregado de dados (DPO) indicado
- [ ] Revisão jurídica das políticas concluída
- [ ] Dados bancários PJ separados para receber as comissões

## Perguntas a fazer em todo programa aprovado

- [ ] Qual o nome do parâmetro de **subid**? *(sem isso o cashback do FN Club não funciona)*
- [ ] Qual a **janela de cookie**?
- [ ] Qual o **percentual real por categoria** do nosso catálogo?
- [ ] Existe **deep link por produto** ou só link de busca?
- [ ] Há **feed de produtos** disponível?
- [ ] O programa permite divulgação por **e-mail e WhatsApp**? *(vários restringem)*
- [ ] Qual o **prazo de confirmação** da comissão? *(define quando o cashback vira sacável)*
- [ ] Qual o **valor mínimo para saque**?

## Depois de cada aprovação

1. Registrar `tag` e `subid` na tabela acima
2. Preencher em `src/dados/catalogo.js`, no objeto `PARCEIROS`
3. Rodar `npm run build` e publicar
4. Conferir na loja que o link de saída sai com os parâmetros
5. Atualizar a tabela da Etapa 4 (`../04-programas-afiliados.md`) com o dado real, substituindo a estimativa
6. Se a comissão real divergir muito da estimada, rodar `npm run docs:financeiro` com a premissa corrigida
