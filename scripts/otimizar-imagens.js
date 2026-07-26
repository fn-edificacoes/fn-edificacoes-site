/* Otimização das fotos do site.
   As originais vieram do site antigo como PNG de 1,3 a 1,8 MB cada — PNG é formato para
   desenho, não para fotografia, e o cliente no celular pagava esse peso. Aqui elas viram
   WebP em duas larguras, para o navegador escolher a que couber na tela. */
import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const ORIGEM = "assets-originais";  // fora de public/: os originais pesam 5 MB e não vão para o ar
const DESTINO = "public/img";
const LARGURAS = [800, 1600];

mkdirSync(DESTINO, { recursive: true });

const fotos = readdirSync(ORIGEM).filter((f) => /\.(png|jpe?g)$/i.test(f));
let antes = 0, depois = 0;

for (const arquivo of fotos) {
  const entrada = path.join(ORIGEM, arquivo);
  const base = path.parse(arquivo).name;
  antes += statSync(entrada).size;

  for (const largura of LARGURAS) {
    const saida = path.join(DESTINO, `${base}-${largura}.webp`);
    await sharp(entrada)
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(saida);
    depois += statSync(saida).size;
    console.log(`${saida}  ${(statSync(saida).size / 1024).toFixed(0)} KB`);
  }
}

console.log(`\nOriginais: ${(antes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Otimizadas (todas as larguras): ${(depois / 1024 / 1024).toFixed(2)} MB`);
