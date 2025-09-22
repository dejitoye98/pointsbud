# Install dependencies
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS production
WORKDIR /app

COPY --from=build /app ./

# Ensure Nuxt binds to Render’s injected port
ENV HOST=0.0.0.0
ENV PORT=$PORT

EXPOSE 3000

CMD ["npm", "run", "start"]
