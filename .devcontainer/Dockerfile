FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Instalacja globalnych narzędzi, jeśli są potrzebne (np. pm2, vercel cli)
RUN npm install -g npm@latest

# Zapewnienie poprawnego działania portów Next.js
EXPOSE 3000

# Konfiguracja środowiska pod Next.js
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development
