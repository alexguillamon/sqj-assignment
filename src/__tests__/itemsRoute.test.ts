/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, POST } from "~/app/api/rest/items/route";
import { db, eq, items } from "~/backend/db";

function customCreateMocks(options?: any) {
  const { req, res } = createMocks(options);

  req.json = async () => req.body;

  return { req, res };
}

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("/api/items", () => {
  describe("GET method", () => {
    test("should return a list with all products", async () => {
      const { req } = createMocks({
        method: "GET",
      });

      const response = await GET(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(200);
      expect(parsedResponse).toHaveProperty("data");
      expect(parsedResponse.data).toHaveLength(5);
    });
  });

  describe("POST method", () => {
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

      const response = await POST(req);

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

      const response = await POST(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message", "Invalid JSON");
    });

    test("should return 400 on invalid data type on body", async () => {
      const { req } = customCreateMocks({
        method: "POST",
        body: { name: 1, price: 1, description: 1, imageUrl: "" },
      });

      const response = await POST(req);

      const parsedResponse = await response.json();

      expect(response.status).toBe(400);
      expect(parsedResponse).toHaveProperty("message");
      expect(parsedResponse.message).toContain("Validation error");
    });
  });
});
