FROM node:alpine
RUN npm i -g pnpm

WORKDIR /app
COPY package*.json ./
RUN pnpm i
COPY . .
EXPOSE 2998
CMD ["pnpm", "run", "dev"]