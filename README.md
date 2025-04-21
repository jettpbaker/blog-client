# Blog Client

A React-based blog client for reading and interacting with blog content. This is the front end for a full-stack blog project, built with React, Vite, and React Router.

This client is deployed [publicly](https://blog-client-production-7fd1.up.railway.app/).

## Features

- Markdown support for blog content
- User authentication and commenting
- Responsive design for mobile and desktop
- Docker containerization for easy deployment

## Prerequisites

You’ll need the [Blog API](https://github.com/jettpbaker/blog-api) running as the backend for this client to function.

## Deployment Options

You have two options to run this application:

### Option 1: Docker

This is the easiest way to get started, especially if you're not familiar with the JavaScript ecosystem.

1. Make sure you have Docker and Docker Compose installed
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-client
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Start the application:
   ```bash
   docker compose up
   ```
5. Access the application at `http://localhost:5173`

### Option 2: Local Development

If you prefer working directly with Node.js and want to make code changes:

1. Install prerequisites:
   - Node.js (latest LTS version)
   - pnpm (version 10.7.0 or higher)
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-client
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   pnpm dev
   ```
6. Access the application at `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build
- `pnpm lint` - Run ESLint to check code quality
