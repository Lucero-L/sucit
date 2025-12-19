# Strapi 5 suele ir estable con Node 20 LTS
FROM node:20-alpine

WORKDIR /app

# Dependencias primero (mejor cache)
COPY package.json package-lock.json* ./
RUN npm ci

# Copia el resto del proyecto
COPY . .

# Strapi usa 1337
EXPOSE 1337

# Dev mode (hot reload)
CMD ["npm", "run", "develop"]
