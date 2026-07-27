# Loja Recomendada FN — plano executivo

Plano completo para transformar a Loja Recomendada FN em uma unidade de negócio da FN
Edificações, com a vitrine já implementada neste repositório.

## Por onde começar

| Se você é… | Leia |
|---|---|
| Diretoria, com 10 minutos | [Resumo executivo](00-resumo-executivo.md) |
| Diretoria, decidindo o investimento | [Resumo](00-resumo-executivo.md) → [Financeiro](09-plano-financeiro.md) → [Documento executivo](13-documento-executivo.md) |
| Quem vai executar | [Implantação](10-implantacao.md) → [Afiliados](04-programas-afiliados.md) → [Conteúdo](07-plano-conteudo.md) |
| Desenvolvimento | [Arquitetura](05-arquitetura.md) → [Integração com o Sistema](integracao-sistema.md) → [Automação](08-automacao.md) |
| Jurídico | [Plano jurídico](11-juridico.md) |

## Índice

| # | Documento | Conteúdo |
|---|---|---|
| — | [Resumo executivo](00-resumo-executivo.md) | Uma página para o conselho |
| 1 | [Mercado](01-mercado.md) | Tamanho, crescimento, tendências, comportamento, sazonalidade, riscos e oportunidades |
| 2 | [Jornada do cliente](02-jornada.md) | As 7 fases do dia da chave ao primeiro ano |
| 3 | [Catálogo — 300 produtos](03-catalogo-300-produtos.md) | Categorias com métricas e os 300 itens *(gerado)* |
| 4 | [Programas de afiliados](04-programas-afiliados.md) | Comparativo dos 10 programas e ranking |
| 5 | [Arquitetura da loja](05-arquitetura.md) | Páginas, taxonomia, filtros, sistemas transversais |
| 6 | [Kits FN](06-kits-fn.md) | Os 18 kits por momento da jornada *(gerado)* |
| 7 | [Plano de conteúdo](07-plano-conteudo.md) | 12 meses, 9 canais, 5 pilares |
| 8 | [Automação, CRM e IA](08-automacao.md) | 18 gatilhos, segmentação, onde a IA ajuda e onde atrapalha |
| 9 | [Plano financeiro](09-plano-financeiro.md) | 24 meses, 3 cenários, sensibilidade *(gerado)* |
| 10 | [Implantação](10-implantacao.md) | 54 tarefas de 7 a 365 dias, com responsável e indicador |
| 11 | [Plano jurídico](11-juridico.md) | LGPD, CDC, CONAR, contratos e matriz de risco |
| 12 | [Fosso competitivo](12-fosso-competitivo.md) | Os 7 fossos, as 6 apostas grandes e o que não fazer |
| — | [Documento executivo final](13-documento-executivo.md) | Roadmap, organograma, KPIs, expansão, licenciamento, conclusão |
| — | [Integração com o Sistema FN](integracao-sistema.md) | Contratos, endpoints e schema para os repositórios do Sistema |
| — | [**Kit de credenciamento nos marketplaces**](parcerias/README.md) | Material pronto para se cadastrar e falar com os grandes varejistas |

## Documentos gerados a partir do código

As Etapas 3, 6 e 9 **não são escritas à mão**. São geradas a partir das mesmas fontes que
alimentam a loja em produção, para que documento e produto não divirjam:

```bash
npm run docs:catalogo     # Etapas 3 e 6, de src/dados/catalogo.js e src/dados/kits.js
npm run docs:financeiro   # Etapa 9, de scripts/gerar-financeiro.js
npm run docs              # os três
```

Para mudar o catálogo, edite `src/dados/catalogo.js` — a loja e o documento mudam juntos. Para
discutir o plano financeiro, edite as premissas no topo de `scripts/gerar-financeiro.js`: elas
são o objeto real da discussão, o resto é aritmética.

## O que já está implementado

| Item | Onde |
|---|---|
| Vitrine com 300 produtos, 18 kits e filtro por momento | `loja/index.html` · `src/loja/Loja.jsx` |
| Catálogo como fonte única de verdade | `src/dados/catalogo.js` · `src/dados/kits.js` |
| Link de afiliado montado no clique, com subid por cliente | `src/loja/rastreio.js` |
| Política de afiliados, curadoria, LGPD e cookies | `loja/transparencia/index.html` |
| Chamada da loja no site institucional | `src/App.jsx` |

## Pendências que bloqueiam a publicação em produção

- [ ] Razão social, CNPJ, e-mail para requisições de titular e nome do Encarregado (DPO) em
      `loja/transparencia/index.html`
- [ ] Revisão das políticas por advogado
- [ ] Preenchimento de `tag` e `subid` em `src/dados/catalogo.js`, após aprovação em cada programa
