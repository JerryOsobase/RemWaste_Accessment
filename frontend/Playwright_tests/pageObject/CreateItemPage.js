module.exports = class CreateItemPage{

    constructor(page) {
        this.page = page
        this.itemName = page.getByPlaceholder('Item name')
        this.itemDescription = page.getByPlaceholder('Description (optional)')
        this.addItemButton = page.locator(".item-form button")
        this.successMessage = page.locator('.success-popup p')
    }

    async addItem(itemName, itemDescription){
        await this.itemName.fill(itemName)
        await this.itemDescription.fill(itemDescription)
        await this.addItemButton.click()
    }

    async getSuccessMessage() {
        await this.successMessage.waitFor({ state: 'visible', timeout: 5000 })
        return await this.successMessage.textContent()
    }
}