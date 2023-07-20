# JSONIFY

This project is built using Next.js 13, Prisma, SQLite, and Next-auth with Github.

## Prerequisites

- Make sure you have SQLite3 installed on your system. You can download it from the [SQLite](https://www.sqlite.org/download.html) website.

## Getting Started

1. Clone the repository
2. Install dependencies by running `npm install`
3. Set up the database by running `npx prisma migrate dev`
4. Find and rename `.env.example` in the project root into `.env.local`
4. Go to [GitHub](https://github.com/settings/developers) and create new OAuth App
  - Fill out "Application name"
  - For "Homepage URL" use `http://localhost:3000/`
  - For "Authorization callback URL" use `http://localhost:3000/api/auth/callback/github`
5. Copy your "Client ID" and paste it into `.env.local` as `GITHUB_CLIENT_ID`
6. Generate "Client Secret" and paste it into `.env.local` as `GITHUB_CLIENT_SECRET`
7. Now generate random string for `NEXTAUTH_SECRET`
8. Then go to [UploadThing](https://uploadthing.com/)
9. Create new app and copy API KEYS to `.env.local`
10. Start the development server by running `npm run dev`
11. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Next.js 13: A powerful framework for building React applications.
- Prisma: An open-source ORM for Node.js and TypeScript.
- SQLite: A lightweight and easy-to-use database.
- Next-auth: A complete authentication solution for Next.js applications.
- Uploadthing: Simple File Uploader For Next.js Developers.
