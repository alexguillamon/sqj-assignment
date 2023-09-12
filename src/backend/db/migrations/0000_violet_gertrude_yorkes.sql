CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
