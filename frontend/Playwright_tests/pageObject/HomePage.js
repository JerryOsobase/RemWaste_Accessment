module.exports = class HomePage {
    constructor(page){
        this.page = page
        this.createItem = page.locator("a[href*='/create']")
        this.itemList = page.locator(".item-card")
        this.itemName = page.locator('.item-card h3').last()
        this.itemDescription = page.locator('.item-card p').last()
        this.editButton = page.locator("button:has-text('Edit')").last()
        this.deleteButton = page.locator("button:has-text('Delete')").last()
        this.emptyText = page.locator(".no-items")
    }

     getCreateItemLink() {
        return this.createItem
    }

    async itemCount(){
        return await this.itemList.count()
    }

    async verifyItemAddedToList() {
        return {
            name: await this.itemName.textContent(),
            description: await this.itemDescription.textContent()
        }
    }

    async editItem(){
        await this.editButton.click()
    }

    async deleteItem(){
        await this.page.waitForTimeout(5000)
        await this.deleteButton.click()
        await this.page.waitForTimeout(5000)
    }

}