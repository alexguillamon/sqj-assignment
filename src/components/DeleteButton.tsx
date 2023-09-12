"use client";
import ky from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Item } from "~/backend/db";

type StatusType = "idle" | "loading" | "error" | "success";

export default function DeleteButton({ id }: { id: number }) {
  const [status, setStatus] = useState<StatusType>("idle");
  const router = useRouter();

  function deleteItem(id: number) {
    return async function () {
      try {
        setStatus("loading");
        const res = await ky
          .delete(`/api/rest/items/${id}`)
          .json<{ data: Item }>();
        if (res.data) {
          setStatus("success");
          router.refresh();
        }
      } catch (error: any) {
        setStatus("error");
        if (error.name === "HTTPError") {
          const errorJson = await error.response.json();
          console.log(errorJson);
        }
      }
    };
  }
  return (
    <p className="text-gray-400 hover:text-red-500" onClick={deleteItem(id)}>
      Delete<span className="sr-only">, {id}</span>
    </p>
  );
}
