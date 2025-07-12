FROM node:24.0.2-alpine3.21 AS development

RUN apk add --no-cache libc6-compat git

RUN corepack enable pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./

RUN pnpm install

COPY . .

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000 

CMD ["pnpm", "run", "dev"]