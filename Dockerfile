FROM node:20-alpine AS builder
WORKDIR /app

# Align npm with lock file expectations
RUN npm install -g npm@11.8.0

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
