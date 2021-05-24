beforeEach(async () => {
    await jestPlaywright.resetPage();
    await page.goto("https://demoqa.com/elements");
})

describe("Text box tests", () => {
    test.todo("Should navigate to elements url")
    test("Should fill form and fields be displayed after clicking submit", async () => {
        await page.click('#item-0')
        await page.type('#userName', "AddressLita");
        await page.type('#userEmail', "test@test.com");
        await page.type('#currentAddress', "test address");
        await page.type('#permanentAddress', "test address that is permanent");
        await page.click('#submit');
        await expect(page).toHaveSelector('#name');
        await expect(page).toHaveSelector('#email');
        await expect(page).toHaveSelector('#currentAddress');
        await expect(page).toHaveSelector('#permanentAddress');
    })
    test.todo("Email field displays error box when input is not an email") //field error class based?
    test.todo("Information displayed matches information input")
    test.todo("Verification of elements displaying")
    test.todo("Empty field does not appear in lower section")
})

