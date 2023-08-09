FROM node:18.14.2-alpine AS base

    # This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
    # Make sure you update both files!

    FROM base AS builder

    ENV PNPM_HOME="/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"

    # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
    RUN apk add --no-cache libc6-compat
    RUN apk update

    # Set working directory
    WORKDIR /app

    RUN corepack enable
    # RUN corepack prepare pnpm@7.4.1 --activate 
    RUN pnpm add -g turbo
    COPY . .
    RUN turbo prune --scope=web --docker



# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

    RUN apk add --no-cache libc6-compat
    RUN apk update
    WORKDIR /app

    RUN corepack enable

    # First install the dependencies (as they change less often)
    COPY .gitignore .gitignore
    COPY --from=builder /app/out/json/ .
    COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
    RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

    # Build the project
    COPY --from=builder /app/out/full/ .
    COPY turbo.json turbo.json

    # Uncomment and use build args to enable remote caching
    # ARG TURBO_TEAM
    # ENV TURBO_TEAM=$TURBO_TEAM

    # ARG TURBO_TOKEN
    # ENV TURBO_TOKEN=$TURBO_TOKEN

    RUN pnpm turbo run build --filter=web...

FROM base AS runner
    WORKDIR /app

    # Don't run production as root
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    USER nextjs

    # COPY --from=installer /app/apps/web/next.config.js .
    # COPY --from=installer /app/apps/web/package.json .

    # Automatically leverage output traces to reduce image size
    # https://nextjs.org/docs/advanced-features/output-file-tracing
    COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
    COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
    COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

    EXPOSE 3000  
    
    ENV NEXT_TELEMETRY_DISABLED 1

    CMD ["node", "apps/web/server.js"]
