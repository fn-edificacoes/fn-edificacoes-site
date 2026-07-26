/* Fotos das entregas de chaves para a galeria do site.

   As originais têm no máximo 540px de largura (vieram do Instagram, já comprimidas).
   Não dá para inventar resolução que não foi capturada, então o trabalho aqui é o
   oposto: recortar bem e exportar em WebP para carregarem rápido no celular.

   Recorte 3:4 com a estratégia "attention" do sharp, que escolhe a região de maior
   interesse da imagem — em foto de gente, quase sempre os rostos. Evita cortar cabeça
   ao transformar 9:16 em cartão. */
import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const ORIGEM = "assets-originais/vistorias";
const DESTINO = "public/img/vistorias";
/* 1080 cobre telas de alta densidade (3x num cartão de 340px). Vem de um original de
   540px, entao e ampliacao: usamos Lanczos3, que preserva borda melhor que o
   redimensionamento padrao do navegador, com nitidez leve por cima. Nao vira detalhe
   novo — apenas evita o borrao de deixar o navegador esticar sozinho. */
const LARGURAS = [320, 540, 1080];

mkdirSync(DESTINO, { recursive: true });

const fotos = readdirSync(ORIGEM).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
let antes = 0, depois = 0;
const nomes = [];

for (const [i, arquivo] of fotos.entries()) {
  const entrada = path.join(ORIGEM, arquivo);
  const base = `vistoria-${String(i + 1).padStart(2, "0")}`;
  nomes.push(base);
  antes += statSync(entrada).size;

  for (const largura of LARGURAS) {
    const saida = path.join(DESTINO, `${base}-${largura}.webp`);
    await sharp(entrada)
      .resize(largura, Math.round(largura * 4 / 3), {
        fit: "cover",
        position: sharp.strategy.attention,
        kernel: sharp.kernel.lanczos3,
      })
      // Nitidez só onde houve ampliação; nas larguras nativas ela criaria halo.
      .sharpen(largura > 540 ? { sigma: 1.1, m1: 0.6, m2: 2.4 } : { sigma: 0.5 })
      .webp({ quality: largura > 540 ? 86 : 80 })
      .toFile(saida);
    depois += statSync(saida).size;
  }
}

console.log(`${fotos.length} fotos processadas`);
console.log(`Originais: ${(antes / 1048576).toFixed(2)} MB`);
console.log(`WebP (as duas larguras): ${(depois / 1048576).toFixed(2)} MB`);
console.log(`\nNomes para o site:\n${JSON.stringify(nomes)}`);
