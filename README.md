# Energy Portal Demo

A demonstration web application showcasing Next.js 15's full-stack capabilities through an energy account management system. This project serves as a practical example of building modern web applications with TypeScript and Tailwind CSS.

## Demo Features

- 📊 Energy account management interface
- 💳 Payment processing simulation
- 🔍 Account filtering and search functionality
- 📜 Payment history tracking
- 🎯 Full-stack implementation with Next.js 15

## Tech Stack Showcase

- **Frontend:**

  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - Headless UI
  - React Hooks

- **Backend:**
  - Next.js API Routes
  - TypeScript
  - Mock API services for demonstration
  - lowdb for simulated backend with local JSON.

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the demo.

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

### Component Architecture

- Functional components with hooks
- Custom hooks for business logic
- Shared components for reusability
- ESM
