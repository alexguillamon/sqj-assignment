"use client";
import Link from "next/link";
import DeleteButton from "~/components/DeleteButton";
import { Item } from "~/backend/db";
import { state$ } from "~/app/admin/adminState";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useObservable } from "@legendapp/state/react";

export default function ItemsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: () => ky.get("/api/items").json<{ data: Item[] }>(),
  });
  const fakeLoading = useObservable(false);

  const isFakeLoading = fakeLoading.use();
  const items = state$.items.use();

  useEffect(() => {
    if (data) {
      state$.items.set(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) return;
    setTimeout(() => {
      fakeLoading.set(false);
    }, 2000);
  }, []);

  if (isLoading || isFakeLoading) {
    return (
      <div>
        <div
          role="status"
          className=" hidden  mt-8  border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-300  dark:border-gray-300 lg:block"
        >
          <div className="px-3 h-12 flex items-center justify-between bg-gray-50">
            <div>
              <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-24"></div>
            </div>
            <div>
              <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-24"></div>
            </div>
            <div>
              <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-24"></div>
            </div>
            <div>
              <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-24"></div>
            </div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-12"></div>
          </div>

          {[0, 1, 2, 3, 4, 5].map((key) => (
            <div
              key={key}
              className="px-3 h-12 flex items-center justify-between"
            >
              <div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
              </div>
              <div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
              </div>
              <div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
              </div>
              <div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-12"></div>
            </div>
          ))}

          <span className="sr-only">Loading...</span>
        </div>

        <div role="status" className=" lg:hidden w-full flex items-center">
          <svg
            aria-hidden="true"
            className="w-10 h-10  mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-primary-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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
                        className="text-primary-300 hover:text-primary-900"
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
