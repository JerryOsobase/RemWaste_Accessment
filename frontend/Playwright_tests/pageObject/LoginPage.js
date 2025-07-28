module.exports = class LoginPage {
    constructor(page){
        this.page = page
        this.userName = page.getByPlaceholder('Enter username')
        this.password = page.getByPlaceholder('Enter password')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('p.error')

    }

    async login(username, password) {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent()
    }
}