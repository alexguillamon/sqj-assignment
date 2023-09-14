"use client";
import { Item } from "~/backend/db";

import { state$ } from "~/app/admin/adminState";
import { useEffect } from "react";

export default function Hydrate(props: { initialItems: Item[] }) {
  useEffect(() => {
    state$.items.set(props.initialItems);
  }, []);

  return null;
}
