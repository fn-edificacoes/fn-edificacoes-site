import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Domínio próprio na raiz (fnedificacoes.com.br), então sem prefixo de caminho.
//
// Três páginas independentes, em vez de um roteador no cliente: o GitHub Pages
// serve arquivo estático, e /loja/ precisa existir como arquivo de verdade para
// abrir direto, ser indexada e sobreviver a um F5. A página de transparência não
// carrega JavaScript nenhum — política que depende de script é política que pode
// não aparecer.
const pagina = (caminho) => fileURLToPath(new URL(caminho, import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        site: pagina("index.html"),
        loja: pagina("loja/index.html"),
        transparencia: pagina("loja/transparencia/index.html"),
        parceiros: pagina("loja/parceiros/index.html"),
      },
    },
  },
});
