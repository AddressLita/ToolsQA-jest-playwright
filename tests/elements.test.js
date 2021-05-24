beforeEach(async () => {
    await jestPlaywright.resetPage();
    await page.goto("https://demoqa.com/elements");
})

describe("Text box tests", () => {
    test("Should navigate to '/text-box' url", async () => {
        await page.click('#item-0');
        expect(page.url()).toMatch(/text-box/);
    })
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
    test.todo("Empty field does not appear in lower section")
    describe("UI tests", () => {
        test("Should contain main-header with 'Text Box' text", async () =>{
            await page.click('#item-0');
            await expect(page).toEqualText('.main-header', "Text Box");
        })
        test.todo("Verification of elements displaying")
        test.todo("User fields are displayed")
    })
})

