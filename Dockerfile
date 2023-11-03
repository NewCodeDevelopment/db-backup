FROM node:18-bookworm AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production


FROM node:18-bookworm

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN apt-get update && apt-get install -y postgresql && rm -rf /var/lib/apt/lists/*

CMD ["node", "dist/index.js"]