# syntax=docker/dockerfile:1

FROM node:lts-bookworm-slim AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM node:lts-bookworm-slim AS runner
WORKDIR /app

# Install lightweight server
RUN npm install -g serve

# Copy production build
COPY --from=build /app/dist ./dist

# Expose the Vite default preview port
EXPOSE 4173

# Start serving the app
CMD ["serve", "-s", "dist", "-l", "4173"]
