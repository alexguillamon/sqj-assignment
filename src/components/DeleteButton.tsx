"use client";
import ky from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Item } from "~/backend/db";
import DeleteModal from "./DeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { state$ } from "../app/admin/adminState";

type StatusType = "idle" | "loading" | "error" | "success";

export default function DeleteButton({ id }: { id: number }) {
  const [status, setStatus] = useState<StatusType>("idle");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteItem = useMutation({
    mutationFn: (data: number) =>
      ky.delete(`/api/items/${id}`).json<{ data: Item }>(),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });

      state$.items.find((item) => item.get().id === id)?.delete();
      setOpen(false);
    },
  });

  return (
    <>
      <DeleteModal
        open={open}
        onDelete={() => deleteItem.mutate(id)}
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
