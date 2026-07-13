# ==========================================
# Stage 1: Compilación de la aplicación
# ==========================================
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente y compilamos
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Servidor de producción con Nginx
# ==========================================
FROM nginx:1.25-alpine

# Copiamos los archivos estáticos generados en el Stage 1 al directorio de Nginx
# Nota: Si usas Vite, la carpeta de salida suele ser 'dist'. Si usas Create React App, es 'build'.
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos una configuración personalizada de Nginx (la crearemos en el paso 2)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]