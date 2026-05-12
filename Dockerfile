# Base
FROM node:22-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps 
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci

# Builder
FROM base AS builder

# NEXT_PUBLIC_* deben estar disponibles en tiempo de BUILD para que Next.js
# los inline en el bundle del cliente. Se reciben como build-args opcionales
# desde docker-compose. Si se construye con `docker build` plano, quedan
# vacíos (comportamiento previo).
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# Runner
FROM base AS runner
ENV NODE_ENV=production 

# Security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy static files and standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Runner
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]