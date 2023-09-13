import { getById, modify, remove } from "~/backend/handlers/items";

export const GET = getById;
export const PUT = modify;
export const DELETE = remove;
