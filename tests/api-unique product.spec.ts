import { test, expect } from "@playwright/test";

test("GET /products", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.get(
    apiUrl + "/products/01JGDDXXK3EABZ8PHCDGCSWQ5Y"
  );
  expect(response.status()).toBe(200);
});
