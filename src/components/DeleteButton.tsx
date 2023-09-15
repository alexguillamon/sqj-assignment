"use client";
import ky from "ky";
import { useState } from "react";
import type { Item } from "~/backend/db";
import DeleteModal from "./DeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertState$, state$ } from "../app/admin/adminState";

export default function DeleteButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteItem = useMutation({
    mutationFn: (data: number) =>
      ky.delete(`/api/items/${id}`).json<{ data: Item }>(),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });
      state$.items.set(state$.items.get().filter((item) => item.id !== id));
      alertState$.set({
        type: "success",
        message: "Successfully deleted item",
      });
      setOpen(false);
    },
    onError: (err) => {
      alertState$.set({
        type: "error",
        message: "Error deleting item",
      });
      console.error(err);
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
