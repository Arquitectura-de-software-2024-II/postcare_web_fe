# # Usar una imagen base oficial de Node.js
# FROM node:18-alpine AS builder

# # Establecer el directorio de trabajo
# WORKDIR /app

# # Copiar los archivos de configuración
# COPY package.json package-lock.json ./

# # Instalar dependencias
# RUN npm install

# # Copiar el resto del código
# COPY . .

# # Pasar variables de entorno al proceso de construcción
# ARG NEXT_PUBLIC_POSTOPERATION_URL
# ARG NEXT_PUBLIC_USER_MANAGEMENT_URL

# # Construir la aplicación con las variables de entorno
# RUN NEXT_PUBLIC_POSTOPERATION_URL=$NEXT_PUBLIC_POSTOPERATION_URL \
#     NEXT_PUBLIC_USER_MANAGEMENT_URL=$NEXT_PUBLIC_USER_MANAGEMENT_URL \
#     npm run build

# # Etapa de producción
# FROM node:18-alpine
# WORKDIR /app

# # Copiar los archivos necesarios
# COPY --from=builder /app/package.json /app/package-lock.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules

# # Exponer el puerto
# EXPOSE 3000

# # Configuración de producción
# ENV NODE_ENV=production

# # Comando para iniciar la aplicación
# CMD ["npm", "start"]

# Usa una imagen base adecuada
FROM node:18-alpine 

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto correctamente
EXPOSE 3000

# Definir una variable de entorno por defecto (opcional)
ENV NEXT_PUBLIC_API_URL=http://localhost:8081

# Iniciar la aplicación y usar la variable PORT
CMD ["npm", "run", "start"]