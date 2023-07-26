FROM node:18.16.0-alpine
WORKDIR /app
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true 
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --build-from-resource

CMD ["npm", "start"]

