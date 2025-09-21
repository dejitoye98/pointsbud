# Stage 1: Build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app ./

# Expose the port (Heroku/Render/Fly use $PORT)
EXPOSE 3000

# Start the app, binding to $PORT
CMD ["npx", "nuxt", "start", "-p", "${PORT:-3000}"]
