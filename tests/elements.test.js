beforeEach(async () => {
    await jestPlaywright.resetPage();
    await page.goto("https://demoqa.com/elements");
})

describe("Text box tests", () => {

    describe("Main tests", () => {
        test("Should navigate to '/text-box' url", async () => {
            await page.click('#item-0');
            expect(page.url()).toMatch(/text-box/);
        })
        test("Should fill form and fields be displayed after clicking submit", async () => {
            await page.click('#item-0');
            await page.type('#userName', "AddressLita");
            await page.type('#userEmail', "test@test.com");
            await page.type('#currentAddress', "test address");
            await page.type('#permanentAddress', "test address that is permanent");
            await page.click('#submit');
            await expect(page).toHaveSelector('#name');
            await expect(page).toHaveSelector('#email');
            await expect(page).toHaveSelector('text=Current Address :'); //lack of unique id solved by text
            await expect(page).toHaveSelector('#output >> #permanentAddress'); //lack of unique id solved by combined selectors
        })
        test("Should display error border if email does not comply with format", async () => {
            await page.click('#item-0');
            await page.type('#userName', "AddressLita");
            await page.type('#userEmail', "testmail");
            await page.type('#currentAddress', "test address");
            await page.type('#permanentAddress', "test address that is permanent");
            await page.click('#submit');
            await expect(page).toHaveSelector('.field-error') // Error checking based on class for error style
        })
        test("Should display the information that was provided in the inputs", async () => {
            const fullName = "AddressLita";
            const email = "testmail@test.com";
            const curAddr = "Test current address";
            const permAddr = "Test address that is permanent";
            await page.click('#item-0');
            await page.type('#userName', fullName);
            await page.type('#userEmail', email);
            await page.type('#currentAddress', curAddr);
            await page.type('#permanentAddress', permAddr);
            await page.click('#submit');
            await expect(page).toHaveText('#name', fullName);
            await expect(page).toHaveText('#email', email);
            await expect(page).toHaveText('text=' + curAddr, curAddr); //lack of unique id solved by text
            await expect(page).toHaveText('#output >> #permanentAddress', permAddr); //lack of unique id solved by combined selectors

        })
        test("Should not display fields that where not filled", async () => {
            await page.click('#item-0');
            await page.type('#currentAddress', "test address");
            await page.type('#permanentAddress', "test address that is permanent");
            await page.click('#submit');
            await expect(page).not.toHaveSelector('#name', { timeout: 1 * 1000 });
            await expect(page).not.toHaveSelector('#email', { timeout: 1 * 1000 });
        })
    })

    describe("UI intended tests", () => {
        test("Should contain main-header with 'Text Box' text", async () => {
            await page.click('#item-0');
            await expect(page).toEqualText('.main-header', "Text Box");
        })
        test("Should display ToolsQA image", async () => {
            await page.click('#item-0');
            const headerImage = await page.$('header >> img');
            expect(await headerImage.getAttribute('src')).toContain("Toolsqa.jpg");
        })
        test("Should display form containing fields for: name, email, cur address and perm address", async () => {
            await page.click('#item-0');
            await expect(page).toHaveSelector('form >> #userName-wrapper');
            await expect(page).toHaveSelector('form >> #userEmail-wrapper');
            await expect(page).toHaveSelector('form >> #currentAddress-wrapper');
            await expect(page).toHaveSelector('form >> #permanentAddress-wrapper');
        })
        test("Should display element list navigation bar with expected items", async () => {
            await page.click('#item-0');
            await expect(page).toEqualText('.show >> #item-0', "Text Box");
            await expect(page).toEqualText('.show >> #item-1', "Check Box");
            await expect(page).toEqualText('.show >> #item-2', "Radio Button");
            await expect(page).toEqualText('.show >> #item-3', "Web Tables");
            await expect(page).toEqualText('.show >> #item-4', "Buttons");
            await expect(page).toEqualText('.show >> #item-5', "Links");
            await expect(page).toEqualText('.show >> #item-6', "Broken Links - Images");
            await expect(page).toEqualText('.show >> #item-7', "Upload and Download");
            await expect(page).toEqualText('.show >> #item-8', "Dynamic Properties");
            
        })
    })
})

