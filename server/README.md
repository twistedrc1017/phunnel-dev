# Phunnel Server

Production-ready Node.js TypeScript server with Express.js, implementing industry best practices for security, error handling, logging, and environment management.

## Features

- 🔒 **Security**: Helmet, CORS, Rate limiting, API key validation
- 📝 **Logging**: Morgan HTTP logging + custom application logging
- 🛡️ **Error Handling**: Async error handling, custom error classes
- 🌍 **Environment**: Validated environment variables with envalid
- ⚡ **Performance**: Compression, request validation
- 🚀 **Production Ready**: Graceful shutdown, process monitoring

## Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
```

## Development

```bash
npm run dev
```

## Build & Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /` - Hello World endpoint
- `GET /health` - Health check with system info
- `GET /protected` - Protected endpoint (requires x-api-key header)
- `POST /data` - Example POST endpoint with validation

## Environment Variables

See `.env.example` for all available configuration options.

## Security Features

- Helmet for security headers
- CORS with configurable origins
- Rate limiting (production only)
- API key validation for protected routes
- Request validation middleware
- Comprehensive error handling