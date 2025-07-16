FROM rust:1.87.0-bookworm AS rust
WORKDIR /app/
RUN apt-get update && apt-get install --assume-yes protobuf-compiler
RUN rustup target add wasm32-unknown-unknown
COPY client-ext/ ./
RUN cargo build --package=evops-extism --release --target=wasm32-unknown-unknown

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
FROM base AS build
WORKDIR /app/
ENV NODE_ENV=production
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --prod=false
COPY ./ ./
RUN mkdir --parents client-ext/target/wasm32-unknown-unknown/release/
COPY --from=rust /app/target/wasm32-unknown-unknown/release/evops.wasm /app/client-ext/target/wasm32-unknown-unknown/release/
RUN pnpm build
ENTRYPOINT ["pnpm", "run", "serve"]
