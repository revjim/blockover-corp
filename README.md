# ZeroETV

A professional Amazon Vine order tracking and verification platform built with Next.js 14, TypeScript, NextAuth, and Prisma.

## Features

- Modern, responsive design with Tailwind CSS
- NextAuth authentication with credentials provider
- PostgreSQL database with Prisma ORM
- Amazon Vine order tracking and management
- Excel file import for Vine orders
- Statistics dashboard for order analytics
- Privacy Policy and Terms of Service pages
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zero-etv
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and NextAuth secret:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zeroetv"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

Generate a secret with:
```bash
openssl rand -base64 32
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
zero-etv/
├── app/
│   ├── api/auth/[...nextauth]/   # NextAuth API routes
│   ├── vine/                      # Vine order tracking pages
│   ├── account/                   # User account management
│   ├── privacy/                   # Privacy policy page
│   ├── terms/                     # Terms of service page
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── Footer.tsx                 # Footer component
│   ├── Navigation.tsx             # Navigation component
│   └── SessionProvider.tsx        # NextAuth session provider
├── lib/
│   ├── auth.ts                    # NextAuth configuration
│   ├── prisma.ts                  # Prisma client
│   └── email.ts                   # Email utilities
└── prisma/
    └── schema.prisma              # Database schema
```

## Database Schema

The application uses Prisma with PostgreSQL. The schema includes:

- **User**: User accounts with email/password authentication
- **Account**: OAuth account information
- **Session**: User session management
- **VerificationToken**: Email verification tokens
- **VineOrder**: Amazon Vine order tracking with status and metadata

## Authentication

The site uses NextAuth with a credentials provider for email/password authentication. To create a test user, you'll need to:

1. Hash a password using bcrypt
2. Insert a user directly into the database

Example (in a script):
```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash('yourpassword', 10);
// Insert into database with email and hashedPassword
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Password Hashing**: bcryptjs

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

Copyright © 2024-2025 ZeroETV. All rights reserved.
