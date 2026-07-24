# Collector Vault

A modern full-stack web application for organizing and managing collectible items in one place.

Collector Vault allows users to create collections, add items, track estimated values, mark favorites, search and filter items, and view collection statistics through an interactive dashboard.

---

## Features

- Create, edit, and delete collections
- Create, edit, and delete items
- Organize items by collection
- Search items by name, category, or description
- Sort items by:
  - Date Added
  - Name
  - Estimated Value
- Favorite important items
- Track:
  - Condition
  - Purchase Price
  - Estimated Value
  - Release Year
- Interactive dashboard
  - Total Collections
  - Total Items
  - Favorite Items
  - Collection Value
  - Average Item Value
  - Recently Added Items
  - Most Valuable Item
- Responsive design for desktop and mobile

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Server Actions
- Prisma ORM
- SQLite

### Development

- Git
- GitHub
- VS Code

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/collector-vault.git
```

Navigate into the project

```bash
cd collector-vault
```

Install dependencies

```bash
npm install
```

Generate the Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

(Optional) Seed the database

```bash
npx prisma db seed
```

Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Project Structure

```
collector-vault
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── public
├── src
│   ├── actions
│   ├── app
│   ├── components
│   ├── generated
│   └── lib
└── README.md
```

---

## Future Improvements

- User authentication
- Cloud database (PostgreSQL)
- Image uploads
- Collection cover images
- Import/Export collections
- Charts and analytics
- Dark/Light theme
- Cloud deployment

---

## What I Learned

This project helped strengthen my experience with:

- Building full-stack applications using Next.js
- Designing relational databases with Prisma
- Server Actions
- CRUD operations
- Responsive UI development
- TypeScript
- Modern React patterns
- Dashboard design
- Search, filtering, and sorting

---

## License

This project is available under the MIT License.