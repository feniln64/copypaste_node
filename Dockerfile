FROM node:19.03.1-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm ci
RUN npm run build

CMD ["npm", "start"]

