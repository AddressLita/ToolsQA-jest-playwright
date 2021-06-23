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
        test("Should display form containing fields for: name, email, cur address and perm address", async () => {
            await page.click('#item-0');
            await expect(page).toHaveSelector('form >> #userName-wrapper');
            await expect(page).toHaveSelector('form >> #userEmail-wrapper');
            await expect(page).toHaveSelector('form >> #currentAddress-wrapper');
            await expect(page).toHaveSelector('form >> #permanentAddress-wrapper');
        })
    })
})

// Check box section is considered as static
describe("Check box tests", () => {
    describe("Main tests", () => {
        test("Should navigate to '/checkbox' url", async () => {
            await page.click('#item-1');
            expect(page.url()).toMatch(/checkbox/);
        })
        test("Should display next file level when the arrow is clicked", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await expect(page).toHaveSelector('"Desktop"');
            await expect(page).toHaveSelector('"Documents"');
            await expect(page).toHaveSelector('"Downloads"');
        })
        test("Should display 'You have selected :' message with all folders and files when selecting home folder", async () => {
            await page.click('#item-1');
            await page.click('[for=tree-node-home]');
            await expect(page).toHaveSelector('#result');
            await expect(page).toEqualText('#result', "You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile")
        })
        test("Should hide 'You have selected' message when clicking and already selected home folder", async () => {
            await page.click('#item-1');
            await page.click('[for=tree-node-home]');
            await expect(page).toHaveSelector('#result');
            await page.click('[for=tree-node-home]');
            await expect(page).not.toHaveSelector('#result', { timeout: 1 * 1000 });
        })
        test("Should select every element by clicking a partially selected home folder", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await page.click('[for=tree-node-desktop]');
            await page.click('[for=tree-node-home]');
            await expect(page).toEqualText('#result', "You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
        })
        test("Should display all items after clicking '+' icon", async () => {
            await page.click('#item-1');
            await page.click('[aria-label="Expand all"]');
            await expect(page).toHaveSelector('"Home"');
            await expect(page).toHaveSelector('"Desktop"');
            await expect(page).toHaveSelector('"Notes"');
            await expect(page).toHaveSelector('"Commands"');
            await expect(page).toHaveSelector('"Documents"');
            await expect(page).toHaveSelector('"WorkSpace"');
            await expect(page).toHaveSelector('"React"');
            await expect(page).toHaveSelector('"Angular"');
            await expect(page).toHaveSelector('"Veu"');
            await expect(page).toHaveSelector('"Office"');
            await expect(page).toHaveSelector('"Public"');
            await expect(page).toHaveSelector('"Private"');
            await expect(page).toHaveSelector('"Classified"');
            await expect(page).toHaveSelector('"General"');
            await expect(page).toHaveSelector('"Downloads"');
            await expect(page).toHaveSelector('"Word File.doc"');
            await expect(page).toHaveSelector('"Excel File.doc"');
        })
        test("Should hide all items after clicking '-' icon", async () => {
            await page.click('#item-1');
            await page.click('[aria-label="Expand all"]');
            await page.click('[aria-label="Collapse all"]');
            await expect(page).not.toHaveSelector('"Notes"', { timeout: 1 * 1000 });
        })
        test("Should select all items inside desktop folder when selecting it", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await page.click('[for=tree-node-desktop]');
            await expect(page).toEqualText('#result', "You have selected :desktopnotescommands");
        })
        test("Should unselect all items inside desktop folder when clicking an already selected desktop folder", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await page.click('[for=tree-node-desktop]');
            await expect(page).toHaveSelector('#result');
            await page.click('[for=tree-node-desktop]');
            await expect(page).not.toHaveSelector('#result', { timeout: 1 * 1000 });
        })
        test("Should select all items inside documents folder when selecting it", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await page.click('[for=tree-node-documents]');
            await expect(page).toEqualText('#result', "You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneral");
        })
        test("Should unselect all items inside documents folder when clicking an already selected documents folder", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await page.click('[for=tree-node-documents]');
            await expect(page).toHaveSelector('#result');
            await page.click('[for=tree-node-documents]');
            await expect(page).not.toHaveSelector('#result', { timeout: 1 * 1000 });
        })
        test("Should display selected file's filename in results", async () => {
            await page.click('#item-1');
            await page.click('[title=Toggle]');
            await page.click(':nth-match(li ol [title=Toggle], 3)');
            await page.click('[for=tree-node-wordFile]');
            await expect(page).toHaveText('#result', "wordFile");
        })
    })

    describe("UI intended tests", () => {
        test("Should contain main-header with 'Check Box' text", async () => {
            await page.click('#item-1');
            await expect(page).toEqualText('.main-header', "Check Box");
        })
        test("Should display only home folder when arriving to the page", async () => {
            await page.click('#item-1');
            await expect(page).toHaveSelector('"Home"');
            await expect(page).not.toHaveSelector('"Desktop"', { timeout: 1 * 1000 });
            await expect(page).not.toHaveSelector('#result', { timeout: 1 * 1000 });
        })
    })

})

describe("Radio button tests", () => {
    describe("Main tests", () => {
        test("Should navigate to '/radio-button' url", async () => {
            await page.click('#item-2');
            expect(page.url()).toMatch(/radio-button/);
        })
        test("Should display 'You have selected Yes' message when selecting 'Yes' radio button", async () => {
            await page.click('#item-2');
            await page.check('[for=yesRadio]');
            await expect(page).toHaveText('p', "Yes");
        })
        test("Should display 'You have selected Impressive' message when selecting 'Impressive' radio button", async () => {
            await page.click('#item-2');
            await page.check('[for=impressiveRadio]');
            await expect(page).toHaveText('p', "Impressive");
        })
        test("Should display 'No' radio button disabled", async () => {
            await page.click('#item-2');
            const radioNo = await page.$('[for=noRadio]');
            expect(await radioNo.isDisabled()).toBeTruthy();
        })
    })

    describe("UI intended tests", () => {
        test("Should contain main-header with 'Radio Button' text", async () => {
            await page.click('#item-2');
            await expect(page).toEqualText('.main-header', "Radio Button");
        })
        test("Should display question 'Do you like the site?'", async () => {
            await page.click('#item-2');
            await expect(page).toEqualText('.mb-3', "Do you like the site?");
        })
        test("Should display 3 radio buttons", async () => {
            await page.click('#item-2');
            await expect(page).toHaveSelectorCount('[type=radio]', 3);
        })
        test("Should display expected options in radio buttons", async () => {
            await page.click('#item-2');
            await expect(page).toEqualText('[for=yesRadio]', "Yes");
            await expect(page).toEqualText('[for=impressiveRadio]', "Impressive");
            await expect(page).toEqualText('[for=noRadio]', "No");
        })
        test("Should not display 'You have selected' message when no radio button has been selected", async () => {
            await page.click('#item-2');
            await expect(page).not.toHaveSelector('p', { timeout: 1 * 1000 });
        })
    })
})

describe("Web tables tests", () => {
    describe("Main tests", () => {
        test("Should navigate to '/webtables' url", async () => {
            await page.click('#item-3');
            expect(page.url()).toMatch(/webtables/);
        })
        test("Should add a record when filling 'Registration Form' after clicking submit button", async () => {
            await page.click('#item-3');
            await page.click('#addNewRecordButton');
            await page.fill('#firstName', "Test");
            await page.fill('#lastName', "Last");
            await page.fill('#userEmail', "test@email.com");
            await page.fill('#age', "55");
            await page.fill('#salary', "1000");
            await page.fill('#department', "Building");
            await page.click('#submit');
            await expect(page).toHaveSelector('"Last"');
        })
        test("Should edit a record when clicking editing icon", async () => {
            await page.click('#item-3');
            await page.click('#edit-record-2');
            await page.fill('#firstName', "Test");
            await page.click('#submit');
            await expect(page).toHaveSelector('"Test"');
        })
        test("Should delete a record when clicking delete icon", async () => {
            await page.click('#item-3');
            await page.click('#delete-record-1');
            await expect(page).not.toHaveSelector('"Cierra"', { timeout: 1 * 1000 });
        })
        test("Should display error texboxes if input do not match the expected pattern", async () => {
            await page.click('#item-3');
            await page.click('#addNewRecordButton');
            await page.fill('#userEmail', "test");
            await page.fill('#age', "t");
            await page.fill('#salary', "text");
            await page.click('#submit');
            await expect(page).toHaveSelectorCount('input:invalid', 6);
        })
        test("Should display only records that have a matching field wiht the value input on the search bar", async () => {
            await page.click('#item-3');
            await page.fill('#searchBox', "45");
            await expect(page).toHaveSelector('"45"');
            await expect(page).not.toHaveSelector('"29"', { timeout: 1 * 1000 });
        })
        test("Should sort in ascending alphabetical order based on 'First Name' field when cliking 'First Name' heading", async () => {
            let nameArr = [];
            await page.click('#item-3');
            const tempArr = await page.$$('.rt-td');
            for (i = 0; i < tempArr.length; i += 7) {
                nameArr.push(await tempArr[i].textContent())
            }
            nameArr.sort();
            await page.click(':nth-match(.rt-th, 1)');
            await expect(page).toHaveText(':nth-match(.rt-td, 1)', nameArr[0]);
        })
        test("Should sort in ascending alphabetical order based on 'Last Name' field when cliking 'Last Name' heading", async () => {
            let nameArr = [];
            await page.click('#item-3');
            const tempArr = await page.$$('.rt-td');
            for (i = 1; i < tempArr.length; i += 7) {
                nameArr.push(await tempArr[i].textContent())
            }
            nameArr.sort();
            await page.click(':nth-match(.rt-th, 2)');
            await expect(page).toHaveText(':nth-match(.rt-td, 2)', nameArr[0]);
        })
        test("Should sort in ascending alphabetical order based on 'Age' field when cliking 'Age' heading", async () => {
            let ageArr = [];
            await page.click('#item-3');
            const tempArr = await page.$$('.rt-td');
            for (i = 2; i < tempArr.length; i += 7) {
                ageArr.push(await tempArr[i].textContent())
            }
            ageArr.sort();
            await page.click(':nth-match(.rt-th, 3)');
            await expect(page).toHaveText(':nth-match(.rt-td, 3)', ageArr[0]);
        })
        test("Should sort in ascending alphabetical order based on 'Email' field when cliking 'Email' heading", async () => {
            let emArr = [];
            await page.click('#item-3');
            const tempArr = await page.$$('.rt-td');
            for (i = 3; i < tempArr.length; i += 7) {
                emArr.push(await tempArr[i].textContent())
            }
            emArr.sort();
            await page.click(':nth-match(.rt-th, 4)');
            await expect(page).toHaveText(':nth-match(.rt-td, 4)', emArr[0]);
        })
        test("Should sort in ascending numerical order based on 'Salary' field when cliking 'Salary' heading", async () => {
            let salArr = [];
            await page.click('#item-3');
            const tempArr = await page.$$('.rt-td');
            for (i = 4; i < tempArr.length; i += 7) {
                salArr.push(await tempArr[i].textContent())
            }
            salArr.sort(function (a, b) { return a - b }); //sorting numerically ascending, this places "&nbsp" first
            let cleanArr = salArr.filter(function (num) { return num != '\xa0' }); //Creating a clean array that will erase Non-breakable space(&nbsp) elements, &nbsp is char 0xa0 (160 dec)
            await page.click(':nth-match(.rt-th, 5)');
            await expect(page).toHaveText(':nth-match(.rt-td, 5)', cleanArr[0]);
        })
        test("Should sort in ascending alphabetical order based on 'Department' field when cliking 'Department' heading", async () => {
            let depArr = [];
            await page.click('#item-3');
            const tempArr = await page.$$('.rt-td');
            for (i = 5; i < tempArr.length; i += 7) {
                depArr.push(await tempArr[i].textContent())
            }
            depArr.sort();
            await page.click(':nth-match(.rt-th, 6)');
            await expect(page).toHaveText(':nth-match(.rt-td, 6)', depArr[0]);
        })
        test("Should change the rows displayed to the selected option in rows dropdown", async () => {
            await page.click('#item-3');
            await page.selectOption('[aria-label="rows per page"]', '25');
            await expect(page).toHaveSelectorCount('.rt-tr-group', 25);
        })
        test("Should change to next page when 'Next' button is clicked", async () => {
            await page.click('#item-3');
            for (i = 0; i < 2; i++) {
                await page.click('#addNewRecordButton');
                await page.fill('#firstName', "Test");
                await page.fill('#lastName', "Last");
                await page.fill('#userEmail', "test@email.com");
                await page.fill('#age', "55");
                await page.fill('#salary', "1000");
                await page.fill('#department', "Building");
                await page.click('#submit');
            }
            await page.click('#addNewRecordButton');
            await page.fill('#firstName', "Second");
            await page.fill('#lastName', "Page");
            await page.fill('#userEmail', "secondpage@email.com");
            await page.fill('#age', "22");
            await page.fill('#salary', "2000");
            await page.fill('#department', "SecondDepartment");
            await page.click('#submit');
            await page.selectOption('[aria-label="rows per page"]', '5');
            const nxtBut = await page.$('"Next"');
            expect(await nxtBut.isEnabled()).toBeTruthy(); // checking if button is no longer disabled
            await page.click('"Next"');
            await expect(page).toHaveSelector('"Second"');
        })
        test("Should change to previous page when 'Previous' button is clicked", async () => {
            await page.click('#item-3');
            for (i = 0; i < 2; i++) {
                await page.click('#addNewRecordButton');
                await page.fill('#firstName', "Test");
                await page.fill('#lastName', "Last");
                await page.fill('#userEmail', "test@email.com");
                await page.fill('#age', "55");
                await page.fill('#salary', "1000");
                await page.fill('#department', "Building");
                await page.click('#submit');
            }
            await page.click('#addNewRecordButton');
            await page.fill('#firstName', "Second");
            await page.fill('#lastName', "Page");
            await page.fill('#userEmail', "secondpage@email.com");
            await page.fill('#age', "22");
            await page.fill('#salary', "2000");
            await page.fill('#department', "SecondDepartment");
            await page.click('#submit');
            await page.selectOption('[aria-label="rows per page"]', '5');
            await page.click('"Next"');
            const pvrBut = await page.$('"Previous"');
            expect(await pvrBut.isEnabled()).toBeTruthy();
            await page.click('"Previous"');
        })
        test("Should display the amount of pages corresponding to the number of records and rows displayed", async () => {
            await page.click('#item-3');
            for (i = 0; i < 8; i++) {
                await page.click('#addNewRecordButton');
                await page.fill('#firstName', "Test");
                await page.fill('#lastName', "Last");
                await page.fill('#userEmail', "test@email.com");
                await page.fill('#age', "55");
                await page.fill('#salary', "1000");
                await page.fill('#department', "Building");
                await page.click('#submit');
            }
            await page.selectOption('[aria-label="rows per page"]', '5');
            await expect(page).toEqualText('.-totalPages', '3');
        })

    })

    describe("UI intended tests", () => {
        test("Should contain main-header with 'Web Tables' text", async () => {
            await page.click('#item-3');
            await expect(page).toEqualText('.main-header', "Web Tables");
        })
        test("Should display 'Add' button", async () => {
            await page.click('#item-3');
            await expect(page).toHaveSelector('#addNewRecordButton');
        })
        test("Should display search bar", async () => {
            await page.click('#item-3');
            await expect(page).toHaveSelector('#searchBox');
        })
        test("Should display expected header titles", async () => {
            await page.click('#item-3');
            await expect(page).toEqualText(':nth-match(.rt-th, 1)', "First Name");
            await expect(page).toEqualText(':nth-match(.rt-th, 2)', "Last Name");
            await expect(page).toEqualText(':nth-match(.rt-th, 3)', "Age");
            await expect(page).toEqualText(':nth-match(.rt-th, 4)', "Email");
            await expect(page).toEqualText(':nth-match(.rt-th, 5)', "Salary");
            await expect(page).toEqualText(':nth-match(.rt-th, 6)', "Department");
            await expect(page).toEqualText(':nth-match(.rt-th, 7)', "Action");
        })
        test("Should display 3 prefilled records", async () => {
            await page.click('#item-3');
            await expect(page).toHaveSelectorCount('.-padRow', 7);
        })
        test("Should display the first page when accessing the page", async () => {
            await page.click('#item-3');
            const pageNum = await page.$('[aria-label="jump to page"]');
            expect(await pageNum.getAttribute('value')).toBe("1");
        })
        test("Should display 10 rows when accessing the page", async () => {
            await page.click('#item-3');
            await expect(page).toHaveSelectorCount('.rt-tr-group', 10);
        })
        test("Should display navigation buttons as disabled", async () => {
            await page.click('#item-3');
            const nxtBut = await page.$('"Next"');
            expect(await nxtBut.isDisabled()).toBeTruthy();
            const pvrBut = await page.$('"Previous"');
            expect(await pvrBut.isDisabled()).toBeTruthy();
        })
    })
})

describe("Buttons tests", () => {
    describe("Main tests", () => {
        test("Should navigate to '/buttons' url", async () => {
            await page.click('#item-4');
            expect(page.url()).toMatch(/buttons/);
        })
        test("Should display dynamic click message after clicking 'Click Me' button", async () => {
            await page.click('#item-4');
            await page.click('"Click Me"');
            await expect(page).toEqualText('#dynamicClickMessage', "You have done a dynamic click");
        })
        test("Should display right click message after clicking 'Right Click Me' button", async () => {
            await page.click('#item-4');
            await page.click('"Right Click Me"', { button: 'right' });
            await expect(page).toEqualText('#rightClickMessage', "You have done a right click");
        })
        test("Should display double click message after clicking 'Double Click Me' button", async () => {
            await page.click('#item-4');
            await page.dblclick('"Double Click Me"');
            await expect(page).toEqualText('#doubleClickMessage', "You have done a double click");
        })
    })
    describe("UI intended tests", () => {
        test.todo("Should contain main-header with 'Buttons' text")
        test.todo("display three buttons")
    })
})

describe("UI tests for general sections", () => {
    test("Should display ToolsQA image", async () => {
        await page.click('#item-0');
        const headerImage = await page.$('header >> img');
        expect(await headerImage.getAttribute('src')).toContain("Toolsqa.jpg");
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

