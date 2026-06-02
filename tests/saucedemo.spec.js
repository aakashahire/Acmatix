const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const data = require('../fixtures/testData');

let loginPage ;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);

    await loginPage.navigate();
    
});


test('TC01 - Login with standard_user', async ({ page }) => {

await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

await expect(page).toHaveURL(/inventory.html/);

});

// TC02 - Login with locked_out_user
test('TC02 - Login with locked_out_user', async ({ page }) => {

await loginPage.login(
    data.lockedUser.username,
    data.lockedUser.password
);

await expect(loginPage.errorMsg).toBeVisible();


});

// TC03 - Login with wrong password
test('TC03 - Login with wrong password', async ({ page }) => {

await loginPage.login(
    data.invalidUser.username,
    data.invalidUser.password
);

const errorText = await loginPage.getErrorMessage();

expect(errorText).toContain(
    'Username and password do not match'
);


});

// TC04 - Verify inventory at least 4 products are listed 
test('TC04 - Verify at least 4 products are listed ', async ({ page }) => {

const inventoryPage = new InventoryPage(page);

await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

const count = await inventoryPage.products.count();

expect(count).toBeGreaterThanOrEqual(4);


});

// TC05 - Add one product to cart
test('TC05 - Add one product to cart', async ({ page }) => {

const inventoryPage = new InventoryPage(page);
await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

await inventoryPage.addBackpack();

await expect(
    inventoryPage.cartBadge
).toHaveText('1');


});

// TC06 - Add two products and verify cart
test('TC06 - Add two products and verify cart', async ({ page }) => {


const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);
await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

await inventoryPage.addBackpack();
await inventoryPage.addBikeLight();

await inventoryPage.openCart();

expect(
    await cartPage.cartItems.count()
).toBe(2);


});

// TC07 - Full checkout flow
test('TC07 - Full checkout flow', async ({ page }) => {

const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);
const checkoutPage = new CheckoutPage(page);

await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

await inventoryPage.addBackpack();
await inventoryPage.openCart();

await cartPage.checkout();

await checkoutPage.enterCustomerInfo(
    data.checkout.firstName,
    data.checkout.lastName,
    data.checkout.postalCode
);

await checkoutPage.continueCheckout();
await checkoutPage.finishCheckout();

await expect(
    checkoutPage.confirmationMsg
).toHaveText(
    'Thank you for your order!'
);


});

// TC08 - Verify after logout, user is redirected back to the login page

test('TC08 - Logout', async ({ page }) => {

const inventoryPage = new InventoryPage(page);

await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

await inventoryPage.logout();

await expect(
    loginPage.loginBtn
).toBeVisible();


});

test.only('B1 - Verify products are sorted by Price Low to High', async ({ page }) => {

const loginPage = new LoginPage(page);
const inventoryPage = new InventoryPage(page);

await loginPage.navigate();

await loginPage.login(
    data.standardUser.username,
    data.standardUser.password
);

await inventoryPage.sortDropdown.selectOption('lohi');

const prices = await inventoryPage.productPrices.allTextContents();

const firstPrice = parseFloat(
    prices[0].replace('$', '')
);

const lastPrice = parseFloat(
    prices[prices.length - 1].replace('$', '')
);

expect(firstPrice).toBeLessThan(lastPrice);

});

test.only('B2 - Login as problem_user and observe application behavior', async ({ page }) => {

const inventoryPage = new InventoryPage(page);

await loginPage.login(
    'problem_user',
    'secret_sauce'
);

await inventoryPage.addBackpack();

await expect(
    inventoryPage.cartBadge
).toHaveText('1');

/*
 OBSERVATION:

 The "problem_user" account is intentionally configured by SauceDemo
 to demonstrate application defects.

 Common issues observed:
 - Product images may not match the product names.
 - Some UI elements may behave unexpectedly.
 - Product information can be inconsistent.
 - Cart functionality generally still works,
   but visual defects are intentionally present.

 This user is provided specifically for testing
 how automation handles application bugs.
*/

});
