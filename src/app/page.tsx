import Link from "next/link";
import { db } from "~/backend/db";

export const runtime = "edge";

export default async function HomePage() {
  const items = await db.query.items.findMany();
  return (
    <main className="flex h-full flex-col items-center bg-white text-black">
      <div className="bg-white">
        <h1 className="text-4xl font-bold text-center pt-10">
          The Best Collection
        </h1>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 md:max-w-7xl md:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-8">
            {items.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 md:aspect-none group-hover:opacity-75 md:h-90">
                  <img
                    src={product.imageUrl}
                    alt={"Front of men's Basic Tee in black."}
                    className="h-full w-full object-cover object-center md:h-full md:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={"/" + product.id}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
