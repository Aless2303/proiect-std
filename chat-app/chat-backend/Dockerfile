FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY server.js package.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]