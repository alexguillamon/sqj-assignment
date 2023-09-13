# TechStore Coding Assignment

The purpose of this project is to create a prototype for TechStore's online product catalog allowing the business to test the market and increase their footprint into the digital world.

This project also showcases my skills using Typescript and NodeJs together with different tools and frameworks.

### The Stack

This app is built using the following stack:

- Frontend & Backend: [Next.js](https://nextjs.org) for React frontend and RESTful API.
- ORM: [Drizzle](https://orm.drizzle.team/) for ORM and migration engine. 
- Styling: [Tailwind CSS](https://tailwindcss.com) and [Tailwind UI](https://tailwindui.com/) for UI styling.
- Database: [Neon](https://neon.tech/) for serverless managed Postgres database.
- File Storage: [Uploadthing](https://uploadthing.com/) for simple file upload storage.

### Requirements

- Node.js 18.x
- PostgreSQL (if developing fully local)
- PNPM 

### Installation & Setup
1. Installing PNPM: If you don't have `pnpm` installed, you can install it using `npm`. For more information, refer to the [official documentation](https://pnpm.io/installation).

    ```
    npm install -g pnpm
    ```


2. Installing Dependencies: Navigate to the project directory and run:

    ```
    pnpm i
    ```
3. Environment Variables: Copy .env.example to a new file called .env and populate it with the necessary credentials and secrets.

### Development

To start the development server, run:

```bash
pnpm dev
```

### Scripts

#### Build

To get a production build of the project, run:

```bash
pnpm build
```

#### Start

To start the built project, run:

```bash
pnpm start
```

#### Test

To start the test suite on watch mode, run:

```bash
pnpm test
```
* Note: tests are run against a branch of the production database in order to have a consistent environment.

#### Database

This project is configured with Drizzle ORM for PostgreSQL database management. You can use the following commands for database operations:

- To generate a new migration, run:
  
  ```bash
  pnpm db:migrate
  ```

- To start Drizzle Studio (UI to explore and change the database data), run:

  ```bash
  pnpm db:studio
  ```

### Deployment

This project is deployed on [Vercel](https://vercel.com).

This is the link to the live project: https://sqj-assignment.vercel.app




