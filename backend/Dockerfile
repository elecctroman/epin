FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN corepack enable && pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json
CMD ["node", "dist/index.js"]
