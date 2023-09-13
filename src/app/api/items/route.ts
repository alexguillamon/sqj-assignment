import { getAll, create } from "~/backend/handlers/items";

export const runtime = "edge";

export const GET = getAll;
export const POST = create;
