# GeekDigital

A professional full-stack web application built with Vue 3 and Vite, serving as a central platform for a personal brand focused on data engineering projects, desktop/web applications, and digital product sales.

## Features

- **Portfolio Showcase**: Display data engineering projects and professional work
- **Application Catalog**: Browse desktop and web applications
- **Digital Store**: Purchase and manage digital products
- **User Authentication**: Secure login with Firebase/Supabase
- **Payment Integration**: Stripe and PayPal support
- **User Dashboard**: Manage purchased apps and licenses

## Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Authentication**: Firebase / Supabase
- **Payments**: Stripe + PayPal

## Project Structure

```
src/
├── assets/           # Static assets and global CSS
├── components/       # Reusable Vue components
│   ├── common/      # Common UI components
│   └── layout/      # Layout components (Navbar, Footer)
├── layouts/         # Page layouts
├── pages/           # Page components
├── router/          # Vue Router configuration
├── store/           # Pinia store modules
│   └── modules/     # Individual store modules
├── services/        # API and external services
├── utils/           # Utility functions
├── context/         # Project context documentation
└── docs/            # Technical documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

### Development

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Environment Variables

See `.env.example` for required configuration:

- Firebase/Supabase credentials
- Stripe public key
- PayPal client ID
- API base URL

## Documentation

- Project context: See `/src/context/` folder
- Technical documentation: See `/src/docs/` folder

## License

All rights reserved.
