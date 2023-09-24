FROM node:latest
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm i
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]