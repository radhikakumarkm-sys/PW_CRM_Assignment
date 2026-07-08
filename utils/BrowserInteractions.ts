import { BrowserContext, Locator, Page } from "@playwright/test";

export interface BaseInteractions {

    page: Page;
    context: BrowserContext;

    /**
     * Clicks on a specified UI element.
     * @param locator - The Playwright Locator for the target element.
     * @param elementName - The user-friendly name of the element for logging purposes.
     * @returns A promise that resolves when the click action is complete.
     */
    click(locator: Locator, elementName: string): Promise<void>;

    /**
     * Clears the input field and fills it with the provided test data.
     * @param locator - The Playwright Locator for the target input field.
     * @param elementName - The user-friendly name of the input field for logging purposes.
     * @param testData - The text string to enter into the input field.
     * @returns A promise that resolves when the fill action is complete.
     */
    fill(locator: Locator, elementName: string, testData: string): Promise<void>;

    /**
     * Selects an option from a dropdown element by its label text.
     * @param locator - The Playwright Locator for the target select dropdown.
     * @param labelValue - The text label of the option to select.
     * @param elementName - The user-friendly name of the dropdown for logging purposes.
     * @returns A promise that resolves when the option is selected.
     */
    selectOption(locator: Locator, labelValue: string, elementName: string): Promise<void>;

    /**
     * Checks a checkbox or radio button element.
     * @param locator - The Playwright Locator for the target checkbox or radio button.
     * @param elementName - The user-friendly name of the element for logging purposes.
     * @returns A promise that resolves when the element is checked.
     */
    check(locator: Locator, elementName: string): Promise<void>;

    /**
     * Asserts that the current page title matches a specific regular expression.
     * @param page - The Playwright Page instance to verify.
     * @param titleRegExp - The regular expression pattern to match against the page title.
     * @param elementName - The user-friendly name of the page for logging purposes.
     * @param errorMessage - Optional custom error message to display if the assertion fails.
     * @returns A promise that resolves if the assertion passes.
     */
    toHaveTitle(page: Page, titleRegExp: RegExp, elementName: string, errorMessage?: string): Promise<void>;

    /**
     * Asserts that a specific UI element is visible on the page.
     * @param Locator - The Playwright Locator for the element being verified.
     * @param elementName - The user-friendly name of the element for logging purposes.
     * @param errorMessage - Optional custom error message to display if the assertion fails.
     * @returns A promise that resolves if the element is visible.
     */
    toBeVisible(Locator: Locator, elementName: string, errorMessage?: string): Promise<void>;

    /**
     * Performs an action that opens a new browser tab/window and switches context to it.
     * @param context - The Playwright BrowserContext managing the pages.
     * @param action - A callback function containing the trigger action (e.g., clicking a link).
     * @returns A promise that resolves to the newly opened Playwright Page instance.
     */
    switchToNewPage(context: BrowserContext, action: () => Promise<void>): Promise<Page>;

    /**
     * Asserts that two element states or text values are strictly equal.
     * @param Locator - The Playwright Locator for the target element being evaluated.
     * @param elementName - The user-friendly name of the element for logging purposes.
     * @param errorMessage - Optional custom error message to display if the assertion fails.
     * @returns A promise that resolves if the equality assertion passes.
     */
    toEqual(Locator: Locator, elementName: string, errorMessage?: string): Promise<void>;

    /**
     * Automatically accepts the next JavaScript dialog (alert, confirm, prompt) and validates its message.
     * @param page - The Playwright Page instance where the alert is triggered.
     * @param expectedMessage - The regular expression pattern to validate against the alert text.
     * @returns A promise that resolves once the dialog is handled and verified.
     */
    alertAccept(page: Page, expectedMessage: RegExp): Promise<void>;

    switchToPage(locator: Locator): Promise<Page>;
}
