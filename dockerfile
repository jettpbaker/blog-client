FROM node:22-slim

# Enable Corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite dev server
CMD ["pnpm", "dev", "--host"]
