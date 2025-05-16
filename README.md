# Energy Portal

A modern web application for managing energy accounts and processing payments, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 View and manage energy accounts
- 💳 Process credit card payments
- 🔍 Filter accounts by energy type
- 🔎 Search accounts by address
- 📜 View payment history

## Tech Stack

- **Frontend:**

  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - Headless UI
  - React Hooks

- **Backend:**
  - Next.js API Routes
  - TypeScript
  - Mock API Services

## Prerequisites

- Node.js 18.17 or later
- npm package manager

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd energy-portal
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── accounts/     # Account-related endpoints
│   │   ├── charges/      # Due charges endpoints
│   │   ├── payments/     # Payment processing endpoints
│   │   └── mocks/        # Mock API services
│   ├── accounts/         # Account management pages
│   ├── payments/         # Payment history pages
│   └── page.tsx          # Home page
├── shared/              # Shared components
└── types/              # TypeScript type definitions
```

## Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Component Structure

- Functional components with hooks
- Custom hooks for business logic
- Shared components for reusability
