# Strapi Backend

Backend CMS du portfolio, basé sur Strapi 5.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

Scripts utiles:

- `npm run dev`: lance Strapi en développement
- `npm run build`: construit l'admin
- `npm run start`: lance Strapi en production
- `npm run upgrade:dry`: prévisualise une montée de version Strapi

## Environnement local

- Port par défaut: `1337`
- Base locale: SQLite
- Uploads locaux: `public/uploads/`

Variables d'environnement:

- voir `.env.example`
- voir `.env.docker`
- voir `.env.production.example`

## Déploiement

Le projet est prévu pour un déploiement sur Railway avec PostgreSQL et Cloudinary.

Voir aussi:

- `../DEPLOYMENT.md`
- `RAILWAY_DEPLOY.md`
