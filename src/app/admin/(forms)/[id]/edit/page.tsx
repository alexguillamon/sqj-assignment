import EditForm from "~/components/EditForm";
import { db, eq, items } from "~/backend/db";

export const runtime = "edge";

export default async function ItemEditPage({
  params,
}: {
  params: { id: number };
}) {
  const item = await db.query.items.findFirst({
    where: eq(items.id, params.id),
  });

  if (!item) {
    return <div>Item not found</div>;
  }
  return <EditForm item={item} />;
}
