import { getById, modify, remove } from "~/backend/handlers/items";

export const runtime = "edge";

export default { GET: getById, PUT: modify, DELETE: remove };
