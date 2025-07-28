module.exports = class ReusableMethods {

    async compareList(element, expectedList) {
        const actualList = await element.allTextContents()

        const trimmedList = actualList.map(v => v.trim())

        let match = expectedList.every(item => trimmedList.includes(item))
        return match
    }
}