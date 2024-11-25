# Rabobank Assessment Backend

A Node.js API built with Express and TypeScript for handling bank statements.

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

## Installation

```bash
npm install
```

## Available Scripts

### Development

To run the application in development mode with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:4000`

### Build

To create a production build:

```bash
npm run build
```

### Production

To run the production build:

```bash
npm run start
```

### Testing

Run tests:

```bash
npm run test
```

## Tech Stack

- Express
- TypeScript
- Multer (file handling)
- xml2js (XML parsing)
- csv-parse (CSV parsing)
- jsPDF (PDF generation)
- Jest (testing)

## API Features

- File upload handling for CSV and XML files
- Statement validation
- PDF report generation
- Error handling middleware
- CORS enabled
- Rate limiting
- File size restrictions (5MB limit)

## File Upload Specifications

Supported file types:
- CSV
- XML


## Testing

Tests are configured with Jest and Supertest for API testing. Test files should be named as `*.test.ts`.
```
