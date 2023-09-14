import Image from "next/image";
import Link from "next/link";
import { Item } from "~/backend/db";

export default async function ProductGrid({ items }: { items: Item[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-8">
      {items.map((item) => (
        <div key={item.id} className="group relative">
          <div className="aspect-h-3 aspect-w-2 w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 lg:h-96">
            <Image
              src={item.imageUrl}
              alt={item.name}
              height={500}
              width={350}
              className="h-full w-full object-cover object-center md:h-full md:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between relative w-full">
            <div className="relative max-w-[75%]">
              <h3 className="text-sm text-gray-700 truncate ">
                <Link href={"/" + item.id}>
                  <span aria-hidden="true" className="absolute inset-0 " />
                  {item.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {item.description}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900 truncate min-w-[25%] text-end">
              $
              {parseFloat(item.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
