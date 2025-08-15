FROM node:lts-bookworm-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y curl
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:lts-bookworm-slim AS runner
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
