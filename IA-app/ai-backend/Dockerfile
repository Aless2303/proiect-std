FROM node:18-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .
ENV NODE_ENV=production
CMD ["npm", "start"]