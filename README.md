# Timothee

Portfolio Next.js avec un backend Strapi dédié.

## Structure

- `src/`: frontend Next.js
- `public/`: assets statiques du site
- `strapi-backend/`: CMS Strapi

## Frontend

```bash
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:3000`.

Variable utile:

- `NEXT_PUBLIC_STRAPI_URL`: URL du backend Strapi

Un exemple de configuration de production est disponible dans `.env.production.example`.

## Backend Strapi

```bash
cd strapi-backend
npm install
npm run dev
```

Le backend démarre sur `http://localhost:1337`.

Pour un lancement via Docker en local:

```bash
docker compose up --build
```

## Déploiement

- Frontend: Vercel ou autre hébergeur Node compatible Next.js
- Backend: Railway
- Images: Cloudinary

Le guide détaillé est dans `DEPLOYMENT.md`.
