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

// TC04 - Verify inventory count
test('TC04 - Verify inventory count', async ({ page }) => {

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

// TC07 - Complete checkout flow
test('TC07 - Complete checkout flow', async ({ page }) => {

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

// TC08 - Logout
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
