# ASM RDC — Thème Cargon

Variante du site **African Shipping Management (ASM) RDC** utilisant le thème **Cargon** (transport & logistique), tout en conservant :

- les **données Strapi** (services, produits, blog, équipe, carrières, à propos, etc.)
- les **routes et fonctionnalités** du site principal (`africansm`)
- l’**API** existante (`asm-api`)

## Démarrage

```bash
cd africansm-cargon
npm install
```

Créer `.env.local` :

```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:1337/api
NEXT_PUBLIC_ASSETS_ORIGIN=http://localhost:1337
NEXT_PUBLIC_ADMIN_EMAIL=support@africansm-rdc.com
```

Lancer l’API Strapi (`asm-api`) puis le frontend :

```bash
npm run dev
```

Site : http://localhost:3000

## Structure

| Dossier | Rôle |
|---------|------|
| `public/cargon/` | Assets du thème Cargon (CSS, JS, images) |
| `src/components/Layouts/cargon/` | Header, footer, scripts, loader |
| `src/components/home/cargon-banner-area.jsx` | Hero slider Cargon + bannières Strapi |
| `src/constants/cargon-menu.js` | Menu de navigation |

## Différences avec `africansm`

- **Header / footer** : design Cargon
- **Accueil** : slider hero style Cargon
- **Pages internes** : mêmes composants fonctionnels, styles Cargon + overrides CSS

## Production

Même procédure que le frontend principal : build Next.js + variables d’environnement pointant vers `https://api.africansm-rdc.com/api`.
