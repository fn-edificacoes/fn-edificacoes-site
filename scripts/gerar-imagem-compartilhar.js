/* Imagem de compartilhamento (og:image) — a que aparece quando alguém manda o link do site
   no WhatsApp, Facebook ou LinkedIn.

   Antes era hero-inspector-1600.webp. Dois problemas: WebP nem sempre aparece na prévia do
   WhatsApp (é por ali que a maioria dos links da FN circula), e a foto era quadrada demais
   para o recorte 1,91:1 das prévias, que cortava o técnico. Agora é um JPG em 1200×630,
   desenhado para esse recorte, com a marca e a frase do topo do site.

   O desenho mora em scripts/compartilhar.html. Para mudar texto ou foto, edite o HTML e rode:

       node scripts/gerar-imagem-compartilhar.js

   O Chrome abre o HTML sem janela, fotografa e este script converte para JPG. Depois de
   publicar, o WhatsApp pode levar alguns dias para trocar a prévia de um link que já tinha
   guardado; links novos já saem com a imagem nova. */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const MOLDE = path.resolve("scripts/compartilhar.html");
const SAIDA = "public/img/compartilhar.jpg";

// Pasta temporária curta: o Chrome no Windows falha calado com caminho longo demais.
const temp = mkdtempSync(path.join(tmpdir(), "fn-og-"));
const png = path.join(temp, "og.png");
try {
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    `--user-data-dir=${path.join(temp, "perfil")}`,
    "--window-size=1200,630",
    "--virtual-time-budget=8000",     // tempo para as fontes do Google chegarem
    "--allow-file-access-from-files",
    `--screenshot=${png}`,
    pathToFileURL(MOLDE).href,
  ], { stdio: "ignore" });

  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(SAIDA);
  console.log(`${SAIDA}  ${(statSync(SAIDA).size / 1024).toFixed(0)} KB`);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
