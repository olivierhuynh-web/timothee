# Dockerfile pour Strapi avec SQLite
FROM node:20-alpine

# Installation des dépendances système nécessaires pour Strapi
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git \
    python3

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
ENV NODE_ENV=development
RUN npm ci

# Copier tout le code source
COPY . .

# Build de l'application Strapi
RUN npm run build

# Exposer le port par défaut de Strapi
EXPOSE 1337

# Commande pour démarrer Strapi
CMD ["npm", "run", "develop"]
