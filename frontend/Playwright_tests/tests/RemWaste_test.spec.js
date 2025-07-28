const { test, expect } = require('@playwright/test')

const POManager = require('../pageObject/POManager')

const data = require("../Utils/TestData.json")

let poManager

let page

let loginPage

let homePage

let createItemPage

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto("http://localhost:3000/")
    poManager = new POManager(page)

    loginPage = poManager.getLoginPage()

    homePage = poManager.getHomePage()

    createItemPage = poManager.getCreateItemPage()
})

test("Login with invalid credentials", async () => {

    await loginPage.login("user", "user")

    expect(await loginPage.getErrorMessage()).toContain("Invalid username or password")
})

test("Login with valid credentials", async () => {

    await loginPage.login(data.username, data.password)

    //Assert user logged in successfully
    await expect(homePage.getCreateItemLink()).toBeVisible()


})

test("Add Item", async () => {

    await homePage.getCreateItemLink().click()

    //Add item
    await createItemPage.addItem(data.itemName, data.itemDescription)

    //Assert item was added successfully
    expect(await createItemPage.getSuccessMessage()).toContain("Item created successfully")

    //Assert item appears in the list
    expect(await homePage.verifyItemAddedToList()).toEqual({
        name: data.itemName,
        description: data.itemDescription
    })

})

test("Edit Item", async () => {
    //edit item
    await homePage.editItem()

    await createItemPage.addItem(data.updatedItemName, data.updatedItemDescription)

    //Assert item updated
    expect(await homePage.verifyItemAddedToList()).toEqual({
        name: data.updatedItemName,
        description: data.updatedItemDescription
    })


})

test("Delete Item", async () => {
    //Assert reduced item count
    const BeforeCount = await homePage.itemCount()

    await homePage.deleteItem()

    const AfterCount = await homePage.itemCount()

    expect(AfterCount).toBe(BeforeCount - 1)

    // Assert the deleted item is no longer in the list
    const itemStillExists = await homePage.itemList.locator(`text=${data.updatedItemName}`).count();
    expect(itemStillExists).toBe(0)

    // Assert that the "No item found" message is visible when there are no items left
    if (AfterCount === 0) {
        await expect(homePage.emptyText).toBeVisible()
        await expect(homePage.emptyText).toHaveText("No Item Added")
    }
})