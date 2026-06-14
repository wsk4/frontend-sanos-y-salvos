# ==========================================
# Fase 1: Build (Compilación con Argumentos)
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Declaramos los argumentos que Vite necesita recibir para la compilación
ARG VITE_API_BASE_URL
ARG VITE_CLERK_PUBLISHABLE_KEY

# Los convertimos en variables de entorno temporales para que el comando 'build' los lea
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

COPY . .
RUN pnpm run build

# ==========================================
# Fase 2: Runtime (Nginx Servidor de Estáticos)
# ==========================================
FROM nginx:alpine

# Copiar configuración customizada de Nginx (Esencial para Single Page Apps / Routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]