# Collector Vault

Collector Vault is a multi-user collection-management web application for organizing personal collectibles, tracking item details, and viewing collection-level statistics. The app uses Clerk authentication, Prisma with PostgreSQL, and server-side ownership checks so signed-in users can manage only their own collections and items.

## Live Website

[Visit Collector Vault!](https://collector-vault-khaki.vercel.app/)

## Features

### Authentication and Ownership

- Clerk-powered sign-up, sign-in, and user account controls
- Authenticated collection and dashboard routes
- Per-user collection access based on Clerk `userId`
- Item actions authorized through the owning collection

### Collection Management

- Create collections with a name and optional description
- View all collections for the signed-in user
- View collection detail pages with item counts
- Delete collections and cascade-delete their items through the Prisma relation

### Item Management

- Create, view, edit, and delete items within a collection
- Track item name, category, description, condition, estimated value, purchase price, release year, and favorite status
- Mark important items as favorites
- Store optional `imageUrl` and collection `coverUrl` fields in the database schema

### Search, Sorting, and Dashboard

- Search items by name, category, or description
- Filter collection views to favorites only
- Sort items by newest, oldest, name, estimated value high-to-low, and estimated value low-to-high
- Dashboard statistics for total collections, total items, favorite items, total estimated value, average item value, recently added items, and most valuable item

## Technology

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4

### Backend and Database

- Next.js Server Actions
- Prisma 7
- PostgreSQL
- Neon-hosted database connection through `DATABASE_URL`
- `pg` and `@prisma/adapter-pg`
- Zod validation for collection creation

### Authentication

- Clerk for authentication UI, session handling, and user identity
- Clerk middleware in [`src/proxy.ts`](src/proxy.ts)
- `ClerkProvider` configured in [`src/app/layout.tsx`](src/app/layout.tsx)

### Deployment

- Vercel for application hosting
- Neon for PostgreSQL hosting
- GitHub remote repository: `https://github.com/SavelMoshi/collector-vault.git`

## Architecture

Collector Vault uses the Next.js App Router for route-based pages and server-rendered data fetching. Authenticated pages call Clerk's `auth()` helper to read the current user, redirect signed-out visitors, and scope Prisma queries to the signed-in user's data. Mutations are handled with Server Actions in [`src/actions/collection-actions.ts`](src/actions/collection-actions.ts), which validate ownership before creating, updating, or deleting records.

Prisma defines the relational data model in [`prisma/schema.prisma`](prisma/schema.prisma). A `Collection` belongs to a Clerk user through `userId`, and each `Item` belongs to a collection through `collectionId`. The item relation uses `onDelete: Cascade`, so deleting a collection removes its associated items.

```text
collector-vault
├── prisma
│   ├── migrations
│   └── schema.prisma
├── public
├── src
│   ├── actions
│   │   └── collection-actions.ts
│   ├── app
│   │   ├── collections
│   │   │   ├── [id]
│   │   │   │   ├── items
│   │   │   │   │   ├── [itemId]/edit
│   │   │   │   │   └── new
│   │   │   │   └── page.tsx
│   │   │   ├── new
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   ├── sign-in
│   │   ├── sign-up
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   ├── lib
│   │   └── prisma.ts
│   └── proxy.ts
├── prisma.config.ts
├── package.json
└── README.md
```

## Security and Data Isolation

User ownership is enforced in the application queries and Server Actions:

- Collection list and dashboard queries filter records with `where: { userId }`.
- Collection detail pages use `findFirst` with both the collection `id` and Clerk `userId`.
- Item creation first verifies that the target collection belongs to the signed-in user.
- Item update and delete actions query through `collection: { userId }` before modifying data.
- Collection deletion uses `deleteMany` with both `id` and `userId`, preventing deletion when the collection does not belong to the current user.

These checks ensure the current implementation scopes collection and item access to the authenticated owner at the application layer.

## Getting Started

### Requirements

- Node.js
- npm
- PostgreSQL database connection string, such as a Neon connection string
- Clerk application keys

### Clone

```bash
git clone https://github.com/SavelMoshi/collector-vault.git
cd collector-vault
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add the required values listed in [Environment Variables](#environment-variables).

### Database Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Run the existing migrations against your configured PostgreSQL database:

```bash
npx prisma migrate dev
```

### Local Development

```bash
npm run dev
```

Open the local app at:

```text
http://localhost:3000
```

## Environment Variables

The repository does not include a committed `.env.example`. The variable names below are derived from the code and local environment configuration. Replace the placeholder values with your own database and Clerk credentials.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/collections"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/collections"
```

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Builds the application for deployment.

```bash
npm run start
```

Starts the built Next.js application.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run postinstall
```

Generates the Prisma Client after dependencies are installed.

## Deployment

The application is set up for deployment on Vercel with a PostgreSQL database hosted on Neon. In a deployed environment, Vercel should provide the Clerk variables and Neon `DATABASE_URL` as environment variables. Prisma reads the database URL through [`prisma.config.ts`](prisma.config.ts), and the app creates its Prisma client with the PostgreSQL adapter in [`src/lib/prisma.ts`](src/lib/prisma.ts).

For deployment database setup, run Prisma migrations against the Neon database before or during deployment:

```bash
npx prisma migrate deploy
```

## Testing and Quality

- ESLint is configured with Next.js Core Web Vitals and TypeScript rules through [`eslint.config.mjs`](eslint.config.mjs).
- TypeScript is configured with `strict` mode in [`tsconfig.json`](tsconfig.json).
- No automated test script is currently configured in [`package.json`](package.json).
- No formatter script is currently configured in [`package.json`](package.json).

## What This Project Demonstrates

Collector Vault demonstrates full-stack application development with Next.js, TypeScript, Clerk authentication, Prisma relational modeling, PostgreSQL persistence, authorization through per-user data scoping, and deployment-oriented configuration for Vercel and Neon. The project shows practical experience building authenticated CRUD workflows, dashboard summaries, searchable and sortable data views, and a maintainable App Router structure.

## License

This project is licensed under the MIT License.