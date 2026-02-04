# 🚀 Guide de déploiement - Portfolio Timothée

## ✅ Ce qui est déjà fait

### Backend (Strapi CMS)
- ✅ Déployé sur Railway
- ✅ PostgreSQL configurée
- ✅ Cloudinary pour les images
- ✅ Content Types créés (Project, Image, Caption)
- ✅ Permissions API configurées
- ✅ URL Railway : [Remplace par ton URL]

### Frontend (Next.js)
- ⏳ À déployer sur Vercel (ou autre)
- ✅ Code prêt et sur GitHub

---

## 🌐 Déployer Next.js sur Vercel

### Étape 1 : Créer un compte Vercel
1. Va sur https://vercel.com
2. Connecte-toi avec GitHub
3. Importe le projet `timothee`

### Étape 2 : Configurer les variables d'environnement
Dans Vercel, ajoute cette variable :

```bash
NEXT_PUBLIC_STRAPI_URL=https://TON-URL-RAILWAY.up.railway.app
```

**Comment ajouter la variable :**
1. Dans Vercel → Ton projet → Settings → Environment Variables
2. Name : `NEXT_PUBLIC_STRAPI_URL`
3. Value : Ton URL Railway
4. Environments : Coche "Production", "Preview", et "Development"
5. Save

### Étape 3 : Déployer
1. Vercel va déployer automatiquement
2. Attends 2-3 minutes
3. Visite ton URL Vercel (ex: `https://timothee.vercel.app`)

---

## 📝 Workflow de travail

### Pour ajouter du contenu (Timothée)
1. Va sur `https://TON-URL-RAILWAY.up.railway.app/admin`
2. Connecte-toi avec tes identifiants
3. Ajoute/modifie tes projets
4. Publish
5. Le site Vercel se met à jour automatiquement (cache de 60s max)

### Pour modifier le code (Olivier)
1. Développe en local avec `npm run dev`
2. Teste avec Strapi local (`http://localhost:1337`)
3. Commit et push sur GitHub
4. Vercel redéploie automatiquement

---

## 🔧 Environnements

### Local (développement)
- Frontend : `http://localhost:3000`
- Strapi : `http://localhost:1337` (Docker)
- Base de données : SQLite (fichier local)

### Production
- Frontend : `https://timothee.vercel.app` (ou ton domaine)
- Strapi : `https://TON-URL-RAILWAY.up.railway.app`
- Base de données : PostgreSQL (Railway)
- Images : Cloudinary CDN

---

## 💰 Coûts mensuels

- **Railway** : ~0-5$/mois (gratuit si < 5$/mois d'usage)
- **Vercel** : Gratuit pour hobby
- **Cloudinary** : Gratuit (25GB/mois)
- **Total** : ~0-5$/mois 💰

---

## 🆘 Troubleshooting

### Les images ne s'affichent pas
1. Vérifie que Cloudinary est bien configuré dans Railway
2. Vérifie que `res.cloudinary.com` est dans `next.config.js` remotePatterns

### Les projets ne s'affichent pas
1. Vérifie que les permissions API sont configurées (Public → Project → find/findOne)
2. Teste l'API directement : `https://TON-URL-RAILWAY/api/projects?populate[images][populate][0]=file&populate[images][populate][1]=captions`

### Erreur 500 sur Strapi
1. Vérifie les logs dans Railway
2. Vérifie que toutes les variables d'environnement sont présentes
3. Vérifie que PostgreSQL fonctionne

---

## 📚 Ressources

- [Documentation Strapi](https://docs.strapi.io/)
- [Documentation Next.js](https://nextjs.org/docs)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
