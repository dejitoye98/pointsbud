FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run generate

FROM node:18-alpine
WORKDIR /app

# Copy static build output
COPY --from=build /app/dist /app/dist

# Install "serve" to serve static files
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
