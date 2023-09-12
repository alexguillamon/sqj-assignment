import { db, eq, items } from "~/backend/db";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const item = await db.query.items.findFirst({
      where: eq(items.id, params.id),
    });
    if (!item) {
      return new Response(JSON.stringify({ message: "Not Found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(item));
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {}
