class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');

        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');

        this.confirmationMsg = page.locator('.complete-header');
    }

    async enterCustomerInfo(first, last, zip) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
    }

    async continueCheckout() {
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }
}

module.exports = CheckoutPage;