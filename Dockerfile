FROM node:18.16.0-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install

CMD ["npm", "start"]

