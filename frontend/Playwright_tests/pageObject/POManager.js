const LoginPage = require('./LoginPage');

const HomePage = require('./HomePage');
const CreateItemPage = require('./CreateItemPage');

module.exports = class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.createItemPage = new CreateItemPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    
    getCreateItemPage() {
        return this.createItemPage;
    }
    getHomePage() {
        return this.homePage;
    }
}