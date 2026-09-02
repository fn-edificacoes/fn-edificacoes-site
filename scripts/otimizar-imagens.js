/* Otimização das fotos do site.
   As originais vieram do site antigo como PNG de 1,3 a 1,8 MB cada — PNG é formato para
   desenho, não para fotografia, e o cliente no celular pagava esse peso. Aqui elas viram
   WebP nas larguras que a página realmente usa.

   Duas situações, com larguras diferentes:

   - Arquivos soltos na raiz de assets-originais/ são as fotos grandes do corpo da página
     (capa, detalhes). Saem em 800 e 1600, que é o que o componente Foto pede.
   - Cada subpasta é um carrossel (assets-originais/entregas/ → /img/entregas/). Ali a foto
     aparece num cartão de 340px recortado em 3:4, então 1600 seria desperdício puro: saem
     em 320, 540 e 1080, exatamente as três larguras do srcSet de LinhaDeFotos.

   ---- Como incluir fotos novas num carrossel ----
   Jogue os arquivos na subpasta (assets-originais/entregas/, assets-originais/vistorias/…)
   com o nome que vierem — do WhatsApp, do Instagram, tanto faz — e rode:

       npm run otimizar-imagens

   O nome de saída é padronizado aqui: "entrega-25", "entrega-26"… continuando a numeração
   que já existe na pasta de destino. É por isso que a foto pode chegar como
   "WhatsApp Image 2026-09-02 at 10.15.33.jpeg" e ainda assim entrar certo no site.

   Foto que já foi convertida antes não é convertida de novo: o script olha o destino e pula.
   Isso mantém o histórico do git limpo (reprocessar tudo mudaria 72 arquivos binários sem
   nenhuma diferença visível) e faz cada rodada tratar só o que chegou. Para refazer alguma,
   apague o arquivo correspondente em public/img/<pasta>/ e rode de novo.

   No fim ele imprime a lista de nomes pronta para colar na constante do App.jsx. */
import sharp from "sharp";
import { readdirSync, mkdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const ORIGEM = "assets-originais";  // fora de public/: os originais pesam 5 MB e não vão para o ar
const DESTINO = "public/img";
const LARGURAS = [800, 1600];
const LARGURAS_GALERIA = [320, 540, 1080];
const EH_IMAGEM = (f) => /\.(png|jpe?g|webp)$/i.test(f);

/* Prefixo do nome padronizado de cada carrossel. Sem entrada aqui, cai no nome da pasta sem
   o "s" do plural — que é a regra que os nomes atuais já seguem (entregas → entrega-01). */
const PREFIXO = { entregas: "entrega", vistorias: "vistoria" };
const prefixoDe = (pasta) => PREFIXO[pasta] || pasta.replace(/s$/, "");

/* Ordem alfabética com número à direita: sem isto "foto-10" viria antes de "foto-2", e o
   carrossel sairia embaralhado em relação à pasta. */
const emOrdem = (a, b) => a.localeCompare(b, "pt-BR", { numeric: true });

mkdirSync(DESTINO, { recursive: true });

let antes = 0, depois = 0, pulados = 0;

/* Proporção de cada peça, gravada num manifesto que o App importa.
   Sem isso o carrossel pula: com altura fixa e largura automática, o navegador só descobre
   a largura quando a imagem termina de baixar — e as que carregam preguiçosamente ficam com
   largura zero até lá, empilhadas no começo da fileira. Com a proporção em mãos ele reserva
   o espaço certo antes de ter o arquivo. */
const dimensoes = {};

async function converter(entrada, destino, base, larguras) {
  const { width, height } = await sharp(entrada).metadata();
  dimensoes[base] = { largura: width, altura: height };
  const jaExiste = larguras.every((l) => existsSync(path.join(destino, `${base}-${l}.webp`)));
  if (jaExiste) { pulados += 1; return false; }
  antes += statSync(entrada).size;
  for (const largura of larguras) {
    const saida = path.join(destino, `${base}-${largura}.webp`);
    await sharp(entrada)
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(saida);
    depois += statSync(saida).size;
    console.log(`${saida}  ${(statSync(saida).size / 1024).toFixed(0)} KB`);
  }
  return true;
}

const itens = readdirSync(ORIGEM, { withFileTypes: true });

// 1) Fotos soltas na raiz — corpo da página. Aqui o nome importa (o código chama pelo nome).
for (const item of itens.filter((i) => i.isFile() && EH_IMAGEM(i.name))) {
  await converter(path.join(ORIGEM, item.name), DESTINO, path.parse(item.name).name, LARGURAS);
}

// 2) Subpastas — carrosséis, com nome padronizado e numeração contínua.
const listas = {};
for (const pasta of itens.filter((i) => i.isDirectory())) {
  const origem = path.join(ORIGEM, pasta.name);
  const destino = path.join(DESTINO, pasta.name);
  mkdirSync(destino, { recursive: true });

  const prefixo = prefixoDe(pasta.name);
  /* De onde continuar a numeração: o maior número já publicado nesta pasta. */
  const publicados = existsSync(destino) ? readdirSync(destino) : [];
  const numeros = publicados
    .map((f) => new RegExp(`^${prefixo}-(\\d+)-\\d+\\.webp$`).exec(f))
    .filter(Boolean).map((m) => Number(m[1]));
  let proximo = numeros.length ? Math.max(...numeros) + 1 : 1;

  /* A foto já convertida numa rodada anterior não tem como ser reconhecida pelo nome do
     original (ele foi trocado por "entrega-07"), então a conta é por quantidade: as N
     primeiras da pasta, em ordem, já viraram as N primeiras publicadas. */
  const originais = readdirSync(origem).filter(EH_IMAGEM).sort(emOrdem);
  const novas = originais.slice(numeros.length);
  if (novas.length) console.log(`\n[${pasta.name}] ${novas.length} foto(s) nova(s), a partir de ${prefixo}-${String(proximo).padStart(2, "0")}`);

  for (const arquivo of novas) {
    const base = `${prefixo}-${String(proximo).padStart(2, "0")}`;
    await converter(path.join(origem, arquivo), destino, base, LARGURAS_GALERIA);
    proximo += 1;
  }
  listas[pasta.name] = { prefixo, total: proximo - 1 };

  /* O manifesto descreve o que está PUBLICADO, não o que rodou agora: numa rodada em que
     nada é novo, converter() nem é chamado, e um manifesto montado só com o que passou por
     ali sairia vazio. Por isso a dimensão é lida da pasta inteira, na mesma ordem que gerou
     os nomes — ler o cabeçalho de um JPEG é barato, não relê a imagem toda. */
  const manifesto = [];
  for (let i = 0; i < originais.length; i++) {
    const nome = `${prefixo}-${String(i + 1).padStart(2, "0")}`;
    const { width, height } = await sharp(path.join(origem, originais[i])).metadata();
    if (width && height) manifesto.push({ nome, largura: width, altura: height });
  }
  if (manifesto.length) {
    const arquivo = path.join("src", "dados", `${pasta.name}.json`);
    mkdirSync(path.dirname(arquivo), { recursive: true });
    writeFileSync(arquivo, `${JSON.stringify(manifesto, null, 2)}\n`, "utf8");
    console.log(`manifesto: ${arquivo} (${manifesto.length} peça(s))`);
  }
}

console.log(`\nOriginais processadas: ${(antes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Otimizadas (todas as larguras): ${(depois / 1024 / 1024).toFixed(2)} MB`);
if (pulados) console.log(`${pulados} foto(s) já convertidas antes, puladas.`);

for (const [pasta, { prefixo, total }] of Object.entries(listas)) {
  if (!total) continue;
  console.log(`\n--- ${pasta}: ${total} foto(s). Para o App.jsx ---`);
  console.log(`Array.from({ length: ${total} }, (_, i) => \`${prefixo}-\${String(i + 1).padStart(2, "0")}\`)`);
}
