# TechStore Coding Assignment

The purpose of this project is to create a prototype for TechStore's online product catalog allowing the business to test the market and increase their footprint into the digital world.

This project also showcases my skills using Typescript and NodeJs together with different tools and frameworks.

## The Stack

This app is built using the following stack:

- [Next.js](https://nextjs.org): framework powering React frontend and RESTful API.
- [Drizzle](https://orm.drizzle.team/): lightweight typesafe ORM and migration engine. 
- [Tailwind CSS](https://tailwindcss.com): CSS styling framework.
- [Tailwind UI](https://tailwindui.com/): production ready styled components built with Tailwind CSS.
- [Neon](https://neon.tech/): managed Postgres database.
- [Uploadthing](https://uploadthing.com/): simple file upload storage.

## Setup
### Requirements

- Node.js 18.x
- PostgreSQL (if developing fully local)
- PNPM 

### Installation
This project uses `pnpm` as the package manager. If you don't already have `pnpm` you can install it using `npm` as shown below. For more info you can check their [docs](https://pnpm.io/installation).

```
npm install -g pnpm
```

Once `pnpm` has been installed you can go ahead and run:

```
pnpm i
```
This will install all dependencies.

The next step will be to set up your environment variables. This this project there is a `.env.example` file. This file has the needed declarations for the variables. 

Copy this file and rename the copy to `.env`. Once this is completed use your company credentials and retreive the secrets for each of those.
### Development

To start the development server, run:

```bash
pnpm dev
```

## Scripts

### Build

To get a production build of the project, run:

```bash
pnpm build
```

### Start

To start the built project, run:

```bash
pnpm start
```

### Database

This project is configured with Drizzle ORM for PostgreSQL database management. You can use the following commands for database operations:

- To generate a new migration, run:
  
  ```bash
  pnpm db:migrate
  ```

- To start Drizzle Studio (UI to explore and change the database data), run:

  ```bash
  pnpm db:studio
  ```

## Deployment

This project is deployed on [Vercel](https://vercel.com).

This is the link to the live project: https://sqj-assignment.vercel.app




