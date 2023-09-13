import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Item, items, schema } from ".";

const jsonString =
  '[{"name":"Item 1","description":"Amazing, breathtaking. Item 1","price":"45", "imageUrl": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"},{"name":"Item 2","description":"Dark, coveted, mysterious. Item 2.","price":"300", "imageUrl": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"},{"name":"Item 3","description":"You know it, we know it. Item 3.","price":"500", "imageUrl": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"},{"name":"Item 4","description":"Incredible, just wow. Item 4.","price":"700.99", "imageUrl": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"},{"name":"Item 5","description":"Ultimate, unique, one of one. Item 5.","price":"180000", "imageUrl": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"}]';

const jsArray: Item[] = JSON.parse(jsonString);

export async function seed(db: NodePgDatabase<typeof schema>) {
  try {
    console.log("Seeding database...");
    await db.insert(items).values(jsArray);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
  }
}
