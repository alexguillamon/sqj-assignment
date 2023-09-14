"use client";
import ky from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Item } from "~/backend/db";
import DeleteModal from "./DeleteModal";
import { set } from "react-hook-form";

type StatusType = "idle" | "loading" | "error" | "success";

export default function DeleteButton({ id }: { id: number }) {
  const [status, setStatus] = useState<StatusType>("idle");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function deleteItem(id: number) {
    return async function () {
      try {
        setStatus("loading");
        const res = await ky.delete(`/api/items/${id}`).json<{ data: Item }>();
        if (res.data) {
          setStatus("success");
          router.refresh();
          setOpen(false);
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
    <>
      <DeleteModal
        open={open}
        onDelete={deleteItem(id)}
        onClose={() => setOpen(false)}
      />
      <p
        className="text-gray-400 hover:text-red-500"
        onClick={() => setOpen(true)}
      >
        Delete<span className="sr-only">, {id}</span>
      </p>
    </>
  );
}
