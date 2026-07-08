import test, { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { BaseInteractions } from "./BrowserInteractions";

export class BrowserInteractionsImpl implements BaseInteractions {
    page: Page;
    context: BrowserContext;

    /**
     * Initializes a new instance of the BrowserInteractionsImpl class.
     * @param page - The active Playwright Page instance.
     * @param context - The active Playwright BrowserContext instance.
     */
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    /**
     * Checks a checkbox or radio button element within a test step.
     * @param locator - The Playwright Locator for the target checkbox or radio button.
     * @param elementName - The user-friendly name of the element for reporting.
     * @returns A promise that resolves when the element is checked.
     */
    async check(locator: Locator, elementName: string): Promise<void> {
        await test.step(`check the element - ${elementName}`, async () => {
            await locator.check();
        })
    }

    /**
     * Clicks on a specified UI element within a test step.
     * @param locator - The Playwright Locator for the target element.
     * @param elementName - The user-friendly name of the element for reporting.
     * @returns A promise that resolves when the click action is complete.
     */
    async click(locator: Locator, elementName: string): Promise<void> {
        await test.step(`Click the Element - ${elementName}`, async () => {
            await locator.click();
        })
    }

    /**
     * Forces a click action on a specified UI element, bypassing actionability checks.
     * @param locator - The Playwright Locator for the target element.
     * @param elementName - The user-friendly name of the element for reporting.
     * @returns A promise that resolves when the forced click action is complete.
     */
    async forceClick(locator: Locator, elementName: string): Promise<void> {
        await test.step(`Click the Element - ${elementName} using Force`, async () => {
            await locator.click({ force: true });
        })
    }

    /**
     * Fills an input field with the provided text data within a test step.
     * @param locator - The Playwright Locator for the target input field.
     * @param elementName - The user-friendly name of the input field for reporting.
     * @param testData - The text string to input into the field.
     * @returns A promise that resolves when the fill action is complete.
     */
    async fill(locator: Locator, elementName: string, testData: string): Promise<void> {
        await test.step(`Fill in the Element - ${elementName}`, async () => {
            // await locator.clear();
            await locator.fill(testData);
        })
    }

    /**
     * Clears the value of an input field within a test step.
     * @param locator - The Playwright Locator for the target input field.
     * @param elementName - The user-friendly name of the input field for reporting.
     * @returns A promise that resolves when the input field is cleared.
     */
    async clear(locator: Locator, elementName: string): Promise<void> {
        await test.step(`Clear the Element - ${elementName}`, async () => {
            await locator.clear();
        })
    }

    /**
     * Intercepts a new page event triggered by an action and switches tracking to it.
     * @param context - The Playwright BrowserContext managing the page events.
     * @param action - A callback function containing the action that triggers the new page.
     * @returns A promise that resolves to the newly opened Playwright Page instance.
     */
    async switchToNewPage(context: BrowserContext, action: () => Promise<void>): Promise<Page> {
        return await test.step('Switching context to newly opened popup tab', async () => {
            const [addNewContact] = await Promise.all([
                context.waitForEvent("page"),
                action()
            ]);
            return addNewContact
        });
    }


    async switchToPage(locator: Locator): Promise<Page> {
        const [newAddNewContactPage] = await Promise.all([
            this.context.waitForEvent("page"),
            locator.click()
        ]);
        return newAddNewContactPage;
    }

    /**
     * Selects a dropdown option matching the specified text label within a test step.
     * @param locator - The Playwright Locator for the select dropdown element.
     * @param labelValue - The literal label text of the option to select.
     * @param elementName - The user-friendly name of the dropdown for reporting.
     * @returns A promise that resolves when the option is selected.
     */
    async selectOption(locator: Locator, labelValue: string, elementName: string): Promise<void> {
        await test.step(`Select Dropdown value ${labelValue} in a ${elementName}`, async () => {
            await locator.selectOption({ label: labelValue });
        })
    }

    /**
     * Verifies that the current browser page title matches a given regular expression pattern.
     * @param page - The active Playwright Page instance to verify.
     * @param titleRegExp - The regular expression pattern to assert against the page title.
     * @param elementName - The user-friendly description of the page context.
     * @param errorMessage - Optional custom assertion error message.
     * @returns A promise that resolves if the assertion passes.
     */
    async toHaveTitle(page: Page, titleRegExp: RegExp, elementName: string, errorMessage?: string): Promise<void> {
        await test.step(`Verify element ${elementName} is displayed in title`, async () => {
            await expect(page, errorMessage).toHaveTitle(titleRegExp);
        })
    }

    /**
     * Verifies that the inner text of a located element matches a specific regular expression pattern.
     * @param locator - The Playwright Locator for the target element.
     * @param textRegExp - The regular expression pattern to match against the element text.
     * @param elementName - The user-friendly name of the element for reporting.
     * @param errorMessage - Optional custom assertion error message.
     * @returns A promise that resolves if the text assertion passes.
     */
    async toHaveText(locator: Locator, text: string, elementName: string, errorMessage?: string): Promise<void> {
        await test.step(`Verify element ${elementName} is contain ${text} text`, async () => {
            await expect(locator, errorMessage).toHaveText(text);
        })
    }

    /**
     * Asserts that a specified UI element is visible within the viewport.
     * @param Locator - The Playwright Locator for the element being verified.
     * @param elementName - The user-friendly name of the element for reporting.
     * @param errorMessage - Optional custom assertion error message.
     * @returns A promise that resolves if the visibility assertion passes.
     */
    async toBeVisible(Locator: Locator, elementName: string, errorMessage?: string): Promise<void> {
        await test.step(`Verify element ${elementName} is visible`, async () => {
            await expect(Locator, errorMessage).toBeVisible();
        })
    }

    /**
     * Asserts that the inner text of the first instance of a located element equals the expected contact name.
     * @param Locator - The Playwright Locator matching the target element(s).
     * @param contactName - The expected string value to compare against.
     * @param elementName - The user-friendly name of the element for reporting.
     * @param errorMessage - Optional custom assertion error message.
     * @returns A promise that resolves if the equality assertion passes.
     */
    async toEqual(Locator: Locator, contactName: string, elementName: string, errorMessage?: string): Promise<void> {
        await test.step(`Verify element ${elementName} is equal to ${contactName}`, async () => {
            const actualText = await Locator.nth(0).innerText();
            expect(actualText, errorMessage).toEqual(contactName);
        })
    }

    /**
     * Registers a one-time event listener to validate the message text and accept an upcoming browser dialog.
     * @param page - The Playwright Page instance where the dialog is expected to appear.
     * @param expectedMessage - The regular expression pattern to validate against the alert text message.
     * @returns A promise that resolves when the test step tracking registration finishes.
     */
    async alertAccept(page: Page, expectedMessage: RegExp): Promise<void> {
        await test.step(`Verify alert is accepted`, async () => {
            page.once("dialog", async (dialog) => {
                const alertMsg = dialog.message();
                expect(alertMsg).toMatch(expectedMessage);
                console.log(`ALERT MESSAGE : ${alertMsg}`);
                const alertType = dialog.type();
                console.log(`ALERT TYPE : ${alertType}`);
                await dialog.accept();
            })
        })
    }
}
