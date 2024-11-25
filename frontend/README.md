# Rabobank Assessment Frontend

A React application built with TypeScript and Vite.

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

## Installation

```bash
npm install
```

## Available Scripts

### Development

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

To create a production build:

```bash
npm run build
```

### Preview Production Build

To preview the production build locally:

```bash
npm run serve
```

### Testing

Run tests in console:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

### Code Quality

Run linting:

```bash
npm run lint
```

Run type checking:

```bash
npm run typecheck
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Vitest
- TailwindCSS
- React Router DOM
- React Query
- React Table

## Project Structure

The source code is located in the `src` directory, with absolute imports configured using the `@` alias.

## Testing Setup

Tests are configured with:
- Testing Library
- Happy DOM
- Vitest

Test files should be named as `*.test.{ts,tsx}` and will be automatically picked up by the test runner.
```
