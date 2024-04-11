FROM node:18.18.2-alpine3.18 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18.18.2-alpine3.18 AS runner
WORKDIR /app
COPY ./src ./src
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package*.json ./
EXPOSE 3000
CMD ["npm", "run", "start"]