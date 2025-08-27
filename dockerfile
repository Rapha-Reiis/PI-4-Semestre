# Dockerfile (dev)
FROM node:22-alpine

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm ci || npm install


COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
