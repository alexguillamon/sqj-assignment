"use client";
import Link from "next/link";
import DeleteButton from "~/components/DeleteButton";
import { Item } from "~/backend/db";

import { state$ } from "~/app/admin/adminState";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export default function ItemsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: () => ky.get("/api/items").json<{ data: Item[] }>(),
  });

  useEffect(() => {
    if (data) {
      state$.items.set(data.data);
    }
  }, [data]);
  const items = state$.items.use();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Image Url
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium max-w-[10rem]  text-gray-900 sm:pl-6 truncate">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-[8rem] truncate">
                      {item.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate ">
                      {item.imageUrl}
                    </td>
                    <td className="flex flex-col sm:flex-row gap-x-3 relative whitespace-nowrap py-4 pr-4 text-right sm:min-w-[6rem] text-sm font-medium w-16">
                      <Link
                        href={`/admin/${item.id}/edit`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit<span className="sr-only">, {item.name}</span>
                      </Link>
                      <DeleteButton id={item.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
