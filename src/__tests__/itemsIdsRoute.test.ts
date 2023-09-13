/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, PUT, DELETE } from "~/app/api/rest/items/[id]/route";
import { Item, db, eq, items } from "~/backend/db";

function customCreateMocks(options?: any) {
  const { req, res } = createMocks(options);

  req.json = async () => req.body;

  return { req, res };
}

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("/api/items/:id", () => {
  describe("GET method", () => {
    test("should return the specified item", async () => {
      const { req } = createMocks({
        method: "GET",
      });

      const response = await GET(req, { params: { id: 1 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveProperty("id", 1);
    });

    test("should return a 404 if item doesn't exist", async () => {
      const { req } = customCreateMocks({
        method: "GET",
      });

      const response = await GET(req, { params: { id: 9999999 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(404);
    });
  });

  describe("PUT method", () => {
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

      const response = await PUT(req, { params: { id: item.id } });

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

      const response = await PUT(req, { params: { id: 1 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message", "Invalid JSON");
    });

    test("should return 400 on invalid data type on body", async () => {
      const { req } = customCreateMocks({
        method: "PUT",
        body: { name: 1, price: 1, description: 1, imageUrl: "" },
      });

      const response = await PUT(req, { params: { id: 1 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message");
      expect(parsedResponse.message).toContain("Validation error");
    });
  });

  describe("DELETE method", () => {
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

      const response = await DELETE(req, { params: { id: item.id } });

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

      const response = await DELETE(req, { params: { id: 9999999 } });

      const parsedResponse = await response.json();

      expect(response.status).toBe(404);
    });
  });
});
