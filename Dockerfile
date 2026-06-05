# build
FROM node:20-alpine AS build

WORKDIR /app

# pnpm 9.x es la última versión compatible con Node.js 20
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Copiar dependencias e instalar
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el resto del código y compilar con Vite
COPY . .
RUN pnpm run build


# nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]