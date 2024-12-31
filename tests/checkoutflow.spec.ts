import { test, expect } from "@playwright/test";

test.describe("Home page customer 01 auth", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("end to end checkout and screenshot of confirmation", async ({
    page,
  }) => {
    const thorHammer = page.locator("text=Thor Hammer");
    await expect(thorHammer).toBeVisible();
    await thorHammer.click();
    await page.getByTestId("add-to-cart").click();
    await page.waitForTimeout(5000);
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();
    await page.getByTestId("state").click();
    await page.waitForTimeout(2000);
    await page.getByTestId("state").fill("CA");
    await page.getByTestId("postcode").click();
    await page.waitForTimeout(2000);
    await page.getByTestId("postcode").fill("90001");
    await page.getByTestId("proceed-3").click();
    await page
      .getByTestId("payment-method")
      .selectOption({ value: "credit-card" });
    await page.getByTestId("credit_card_number").fill("0000-0000-0000-0000");
    await page.getByTestId("expiration_date").fill("12/2027");
    await page.getByTestId("cvv").fill("123");
    await page.getByTestId("card_holder_name").fill("Jane Doe");
    await page.getByTestId("finish").click();
    const successBanner = page.locator(
      'div.alert.alert-success >> text="Payment was successful"'
    );
    await expect(successBanner).toBeVisible();
    await page.getByTestId("finish").click();
    const orderConfirmation = page.locator("#order-confirmation");
    await expect(orderConfirmation).toContainText(
      "Thanks for your order! Your invoice number is"
    );
    const invoiceText = await orderConfirmation.locator("span").textContent();
    console.log("Extracted Invoice Number:", invoiceText);
    await orderConfirmation.screenshot({
      path: "screenshots/order-confirmation.png",
    });
    console.log("Screenshot of order confirmation saved!");
  });
});
