# Estúdio Cleyde Ribeiro

Piloto mobile first em Next.js App Router, React, TypeScript, Tailwind CSS, GSAP e Lucide. O site gera arquivos estáticos e usa links diretos para WhatsApp e Google Maps.

## Desenvolvimento

Requisitos de ambiente: Node.js 24 e pnpm.

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

O Next.js gera a versão estática em `out/`. A home fica em `/` e a galeria em `/portfolio/`.

## Conteúdo e imagens

- `src/data/business.ts` reúne informações comerciais, navegação, serviços e a função que monta links do WhatsApp.
- `src/data/portfolio.ts` define os trabalhos, os nomes originais e as coordenadas dos recortes de antes e depois.
- `public/originais/` preserva as seis imagens como recebidas. Para incluir um novo trabalho, adicione a imagem original à pasta, cadastre os recortes em `portfolio.ts` e execute `node scripts/imagens.mts`. O script gera os WebPs em `public/trabalhos/`.
- `src/app/` contém as páginas, o SEO e os estilos. `src/components/` reúne navegação, galeria e animações.

## Deploy no Cloudflare Workers

No projeto Workers conectado ao GitHub, selecione a branch de produção `main` e configure:

- Comando de build: `pnpm run build`.
- Comando de deploy: `npx wrangler deploy`.
- Diretório raiz: a raiz do repositório.

O `wrangler.jsonc` publica a exportação estática de `out/`. Configure `SITE_URL` nas variáveis de build com a origem HTTPS definitiva para habilitar a indexação.

## Deploy no Cloudflare Pages

1. Envie o código para um repositório GitHub e conecte-o ao Cloudflare Pages.
2. Use `pnpm build` como comando de build e `out` como diretório de saída.
3. Defina `SITE_URL` com a origem HTTPS definitiva antes do build. Ela ativa as URLs canônicas, a imagem social e o sitemap indexável. Sem essa configuração, o robots.txt bloqueia a indexação do piloto.
4. Escolha a branch de produção para publicar automaticamente após cada push e conecte o domínio personalizado quando estiver disponível.

O perfil oficial do Instagram e um retrato de Cleyde podem ser adicionados quando forem fornecidos. O portfólio usa apenas trabalhos enviados pelo estúdio.
