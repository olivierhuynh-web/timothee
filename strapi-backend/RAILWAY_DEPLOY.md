# Guide de déploiement Strapi sur Railway

## Prérequis

1. **Compte Cloudinary** (gratuit)
   - Va sur https://cloudinary.com et crée un compte
   - Note ton **Cloud Name**, **API Key**, et **API Secret** depuis le dashboard

2. **Compte Railway** (gratuit)
   - Va sur https://railway.app et crée un compte avec GitHub

## Étapes de déploiement

### 1. Créer un nouveau projet sur Railway

1. Connecte-toi à [Railway](https://railway.app)
2. Clique sur **"New Project"**
3. Sélectionne **"Deploy from GitHub repo"**
4. Autorise Railway à accéder à ton repo GitHub
5. Sélectionne le repo `timothee`
6. Railway va détecter automatiquement le Dockerfile

### 2. Configurer la base de données PostgreSQL

1. Dans ton projet Railway, clique sur **"+ New"**
2. Sélectionne **"Database"** → **"Add PostgreSQL"**
3. Railway va créer automatiquement une variable `DATABASE_URL`

### 3. Configurer les variables d'environnement

Dans Railway, va dans **Variables** et ajoute les variables suivantes :

```bash
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# App Keys (GARDE CES VALEURS EXACTES)
APP_KEYS=J5Tpvo/L73TBOgMGdte2/A==,Qg9VinZ/TTbO7Y+RyjSvGg==,EowDePeHeluAsir1B/p14A==,aF6Eewf+wGTsCtgRjiv6Ow==
API_TOKEN_SALT=Eaix4dznwhCEkrEnNfxGFg==
ADMIN_JWT_SECRET=8emhepmpSulbKXxew0e2ug==
TRANSFER_TOKEN_SALT=YxtQ7sdqYo1Lz2mP7gI5fg==
JWT_SECRET=TUw4NrJgYiJFazFNYUIGkw==

# Database (Railway fournit automatiquement DATABASE_URL)
DATABASE_CLIENT=postgres
DATABASE_SSL=true

# Cloudinary (remplace avec tes vraies valeurs)
CLOUDINARY_NAME=ton-cloud-name
CLOUDINARY_KEY=ta-api-key
CLOUDINARY_SECRET=ton-api-secret
```

### 4. Configurer le déploiement

1. Dans **Settings** → **Deploy**, assure-toi que :
   - **Root Directory** est vide ou `/strapi-backend`
   - **Build Command** : (laisse vide, Docker s'en occupe)
   - **Start Command** : (laisse vide, Docker s'en occupe)

2. Dans **Settings** → **Networking** :
   - Active le **Public Networking**
   - Note l'URL publique (ex: `https://ton-projet.up.railway.app`)

### 5. Déployer

1. Clique sur **"Deploy"** ou pousse un commit sur GitHub
2. Railway va :
   - Construire l'image Docker
   - Lancer Strapi avec PostgreSQL
   - Migrer la base de données

### 6. Vérifier le déploiement

1. Ouvre l'URL de ton projet Railway
2. Va sur `/admin` pour accéder au panel admin
3. Crée un nouveau compte admin (le premier déploiement)
4. Vérifie que l'upload d'images fonctionne avec Cloudinary

## Mise à jour de Next.js

Une fois Strapi déployé, mets à jour `.env.local` dans le projet Next.js :

```bash
# En local (garde localhost pour le dev)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# En production (pour Vercel par exemple)
# NEXT_PUBLIC_STRAPI_URL=https://ton-projet.up.railway.app
```

## Troubleshooting

### Erreur de connexion PostgreSQL
- Vérifie que `DATABASE_CLIENT=postgres` est bien défini
- Vérifie que `DATABASE_SSL=true` est présent

### Images ne s'uploadent pas
- Vérifie les credentials Cloudinary
- Vérifie que le plugin `@strapi/provider-upload-cloudinary` est installé

### Erreur 503 au démarrage
- Attends 2-3 minutes, c'est le temps de build
- Vérifie les logs dans Railway

## Migration des données depuis SQLite

⚠️ **Important** : Les données de ton SQLite local ne seront PAS migrées automatiquement.

Tu devras :
1. Recréer les Content Types dans l'admin de production
2. Re-uploader les images (elles iront sur Cloudinary)
3. Recréer les projets manuellement

Ou utiliser un script de migration (plus complexe).
