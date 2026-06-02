class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }

    async getErrorMessage() {
        return await this.errorMsg.textContent();
    }
}

module.exports = LoginPage;