import Link from "next/link";
import { db } from "~/backend/db";
import DeleteButton from "../../components/DeleteButton";
import ItemsTable from "../../components/ItemsTable";
import Hydrate from "../../components/Hydrate";

export default async function AdminPage() {
  const items = await db.query.items.findMany();

  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Items
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link href={"/admin/add"}>
            <button
              type="button"
              className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Add item
            </button>
          </Link>
        </div>
      </div>
      <Hydrate initialItems={items} />
      <ItemsTable />
    </div>
  );
}
