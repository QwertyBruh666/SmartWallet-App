FROM node:20-bullseye AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000