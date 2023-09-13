/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import {
  getAll,
  getById,
  create,
  modify,
  remove,
} from "~/backend/handlers/items";
import { Item, db, eq, items } from "~/backend/db";

function customCreateMocks(options?: any) {
  const { req, res } = createMocks(options);

  req.json = async () => req.body;

  return { req, res };
}

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("/api/items", () => {
  describe("GET handler", () => {
    test("should return a list with all products", async () => {
      // const itemsCount = await db.;

      const { req } = createMocks({
        method: "GET",
      });

      const response = await getAll(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveLength(5);
    });
  });

  describe("POST handler", () => {
    test("should insert data and return 200", async () => {
      const { req, res } = customCreateMocks({
        method: "POST",
        body: {
          name: "test name",
          price: "333",
          description: "test description",
          imageUrl: "image url",
        },
      });

      const response = await create(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveProperty("id");
      expect(parsedResponse.data).toHaveProperty("name", "test name");
      expect(parsedResponse.data).toHaveProperty("price", "333");
      expect(parsedResponse.data).toHaveProperty(
        "description",
        "test description"
      );
      expect(parsedResponse.data).toHaveProperty("imageUrl", "image url");
      expect(parsedResponse.data).toHaveProperty("createdAt");

      // Clean up
      await db.delete(items).where(eq(items.id, parsedResponse.data.id));
    });

    test("should return 400 on invalid JSON body", async () => {
      const { req } = customCreateMocks({
        method: "POST",
        body: {},
      });

      req.json = jest.fn().mockRejectedValue(new Error("Invalid JSON"));

      const response = await create(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message", "Invalid JSON");
    });

    test("should return 400 on invalid data type on body", async () => {
      const { req } = customCreateMocks({
        method: "POST",
        body: { name: 1, price: 1, description: 1, imageUrl: "" },
      });

      const response = await create(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message");
      expect(parsedResponse.message).toContain("Validation error");
    });
  });
});

describe("/api/items/:id", () => {
  describe("GET handler", () => {
    test("should return the specified item", async () => {
      const { req } = createMocks({
        method: "GET",
      });

      const response = await getById(req, { params: { id: 1 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveProperty("id", 1);
    });

    test("should return a 404 if item doesn't exist", async () => {
      const { req } = customCreateMocks({
        method: "GET",
      });

      const response = await getById(req, { params: { id: 9999999 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(404);
    });
  });

  describe("PUT handler", () => {
    let item: Item;
    beforeAll(async () => {
      const itemArr = await db
        .insert(items)
        .values({
          name: "test name",
          price: "333",
          description: "test description",
          imageUrl: "image url",
        })
        .returning();

      if (!itemArr[0]) {
        throw new Error("Could not insert item");
      }

      item = itemArr[0];
    });

    afterAll(async () => {
      await db.delete(items).where(eq(items.id, item.id));
    });

    test("should insert data for specified item and return 200", async () => {
      const { req, res } = customCreateMocks({
        method: "PUT",
        body: {
          name: "test name",
          price: "333",
          description: "test description",
          imageUrl: "image url",
        },
      });

      const response = await modify(req, { params: { id: item.id } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveProperty("id");
      expect(parsedResponse.data).toHaveProperty("name", "test name");
      expect(parsedResponse.data).toHaveProperty("price", "333");
      expect(parsedResponse.data).toHaveProperty(
        "description",
        "test description"
      );
      expect(parsedResponse.data).toHaveProperty("imageUrl", "image url");
      expect(parsedResponse.data).toHaveProperty("createdAt");
    });

    test("should return 400 on invalid JSON body", async () => {
      const { req } = customCreateMocks({
        method: "PUT",
        body: {},
      });

      req.json = jest.fn().mockRejectedValue(new Error("Invalid JSON"));

      const response = await modify(req, { params: { id: 1 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message", "Invalid JSON");
    });

    test("should return 400 on invalid data type on body", async () => {
      const { req } = customCreateMocks({
        method: "PUT",
        body: { name: 1, price: 1, description: 1, imageUrl: "" },
      });

      const response = await modify(req, { params: { id: 1 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message");
      expect(parsedResponse.message).toContain("Validation error");
    });
  });

  describe("DELETE handler", () => {
    let item: Item;
    beforeAll(async () => {
      const itemArr = await db
        .insert(items)
        .values({
          name: "test name",
          price: "333",
          description: "test description",
          imageUrl: "image url",
        })
        .returning();

      if (!itemArr[0]) {
        throw new Error("Could not insert item");
      }

      item = itemArr[0];
    });

    afterAll(async () => {
      await db.delete(items).where(eq(items.id, item.id));
    });

    test("should delete the specified item return 200", async () => {
      const { req } = customCreateMocks({
        method: "DELETE",
      });

      const response = await remove(req, { params: { id: item.id } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveProperty("id");
      expect(parsedResponse.data).toHaveProperty("name", "test name");
      expect(parsedResponse.data).toHaveProperty("price", "333");
      expect(parsedResponse.data).toHaveProperty(
        "description",
        "test description"
      );
      expect(parsedResponse.data).toHaveProperty("imageUrl", "image url");
      expect(parsedResponse.data).toHaveProperty("createdAt");
    });

    test("should return a 404 if item doesn't exist", async () => {
      const { req } = customCreateMocks({
        method: "DELETE",
      });

      const response = await remove(req, { params: { id: 9999999 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(404);
    });
  });
});
