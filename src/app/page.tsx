import { db } from "~/backend/db";
import ProductGrid from "../components/ProductGrid";

export default async function HomePage() {
  const items = await db.query.items.findMany();
  return (
    <main className="flex h-full flex-col items-center bg-white text-black">
      <div className="bg-white">
        <h1 className="text-4xl font-bold text-center pt-10">
          The Best Collection
        </h1>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 md:max-w-7xl md:px-8">
          <ProductGrid items={items} />
        </div>
      </div>
    </main>
  );
}
