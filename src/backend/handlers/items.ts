import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { db, eq, insertItemsSchema, items } from "~/backend/db";

export async function getAll(request: Request) {
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

export async function getById(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    // Find the item with the given ID
    const item = await db.query.items.findFirst({
      where: eq(items.id, params.id),
    });
    // If no item was found, return a 404
    if (!item) {
      return new Response(JSON.stringify({ message: "Not Found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ data: item }));
  } catch (error) {
    // Catch-all
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

export async function create(request: Request) {
  try {
    // Parse the JSON body into a JavaScript object
    const data = await request.json().catch((error) => {
      throw new Error("Invalid JSON");
    });
    // Validate the data against the schema
    const item = insertItemsSchema.parse(data);

    // Insert the data into the database
    const result = await db.insert(items).values(item).returning();

    revalidatePath("/admin");
    revalidatePath("/");
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

export async function modify(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    // Parse the JSON body into a JavaScript object
    const data = await request.json().catch((error) => {
      throw new Error("Invalid JSON");
    });

    // Validate the data against the schema (You can create a separate schema for updates if needed)
    const item = insertItemsSchema.parse(data);

    // Update the record in the database based on the ID
    const result = await db
      .update(items)
      .set(item)
      .where(eq(items.id, params.id))
      .returning();

    if (result.length > 0) {
      revalidatePath("/admin");
      revalidatePath("/");

      return new Response(JSON.stringify({ data: result[0] }));
    } else {
      return new Response(JSON.stringify({ message: "Item not found" }), {
        status: 404,
      });
    }
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
      // Catch-all for other errors (e.g., database errors)
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

export async function remove(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const result = await db
      .delete(items)
      .where(eq(items.id, params.id))
      .returning();

    if (result.length > 0) {
      revalidatePath("/admin");
      revalidatePath("/");

      return new Response(
        JSON.stringify({ message: "success", data: result[0] })
      );
    } else {
      return new Response(JSON.stringify({ message: "Item not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    // Catch-all
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
