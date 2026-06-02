class InventoryPage {

    constructor(page) {
        this.page = page;

        this.products = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productPrices = page.locator('.inventory_item_price');
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async addBackpack() {
        await this.page
            .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();
    }

    async addBikeLight() {
        await this.page
            .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async logout() {
        await this.menuBtn.click();
        await this.logoutLink.click();
    }
}

module.exports = InventoryPage;