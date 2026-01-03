<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Sourcer – Human Resource Management System (HRMS) 

A modern, role-based Human Resource Management System (HRMS) built using Next.js, TypeScript, and PostgreSQL (NeonDB).

Sourcer digitizes and streamlines core HR operations such as employee onboarding, attendance tracking, leave management, payroll visibility, and approval workflows, delivering a secure and scalable enterprise-ready solution.

The application follows a real-world HR workflow with clear separation of responsibilities between Admins/HR Officers and Employees, ensuring efficiency, transparency, and data security.


## Overview
Sourcer enables organizations to:
- **Manage employees** with secure authentication and role-based access.
- **Track attendance** with daily and weekly views.
- **Handle leave and time-off requests** with approval workflows.
- **Provide payroll visibility** with admin-controlled salary structures.
- **Ensure data security** through protected routes and server-side validation.
- **Scale easily** using modern backend architecture and cloud-hosted PostgreSQL.

## Features


**Authentication & User Management**
- Secure **email & password authentication**.
- **Role-based access control** (Admin / HR Officer / Employee).
- Protected routes using middleware.
- Separate dashboards for Admin and Employee roles.
- Email verification for new users.

**Employee Management**
- Admin can:
  - Create and manage employee accounts.
  - Edit complete employee profiles.
  - Assign roles and manage payroll details.
- Employees can:
  - View personal and job-related details.
  - Edit limited profile information (address, phone, profile picture).


##  Installation
### Clone the Repository
   ```
   git clone https://github.com/your-username/sourcer.git
   cd sourcer
   ```
### Install Dependencies
   ```
   npm install
   ```
### Set up Environment Variables
Create a file named `.env` in the root directory:
   ```
   DATABASE_URL=your_neon_postgres_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
### Run Database Migrations
   ```
   npx prisma migrate dev
   ```
### Start Development Server
   ```
   npm run dev
   ```
#### Open http://localhost:3000 to view the application.


## Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** Next.js API Routes / Server Actions
- **Database:** PostgreSQL (NeonDB)
- **ORM:** Prisma
- **Authentication:** NextAuth (Auth.js)
- **Validation:** Zod
- **Security** bcrypt, middleware-based route protection


##  Contributing
- Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request
>>>>>>> origin/main
