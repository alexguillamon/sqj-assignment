import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { db, insertItemsSchema, items } from "~/backend/db";

export async function GET(request: Request) {
  try {
    const items = await db.query.items.findMany();
    return new Response(JSON.stringify({ data: items }));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    // Parse the JSON body into a JavaScript object
    const data = await request.json().catch((error) => {
      throw new Error("Invalid JSON");
    });
    // Validate the data against the schema
    const item = insertItemsSchema.parse(data);

    // Insert the data into the database
    const result = await db.insert(items).values(item).returning();
    // Return the inserted data
    return new Response(JSON.stringify({ data: result[0] }));
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ message: fromZodError(error).toString() }),
        {
          status: 400,
        }
      );
    }
    // Handle other errors
    if (error instanceof Error) {
      // Handle invalid JSON
      if (error.message === "Invalid JSON") {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 400,
        });
      }
      // Catch-all db errors
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
    // Catch-all
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
