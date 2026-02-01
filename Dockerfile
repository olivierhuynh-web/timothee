# Dockerfile pour déployer Strapi sur Railway
FROM node:20-alpine

# Install dependencies for image processing
RUN apk add --no-cache \
    build-base gcc autoconf automake zlib-dev \
    libpng-dev vips-dev git python3

# Set working directory
WORKDIR /app

# Copy strapi-backend files
COPY strapi-backend/package*.json ./
COPY strapi-backend/ ./

# Install dependencies
ENV NODE_ENV=production
RUN npm ci --only=production

# Build Strapi
RUN npm run build

# Expose port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
