#build
FROM node:20-alpine as build
WORKDIR /app
# Copiamos dependencias e instalamos
COPY package*.json ./
RUN npm install
# Copiamos el resto del código y compilamos con Vite
COPY . .
RUN npm run build

#parte 2 nginx
FROM nginx:alpine

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos la carpeta 'dist' generada en la Etapa 1 al servidor web
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]