FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
CMD ["npm", "start"]