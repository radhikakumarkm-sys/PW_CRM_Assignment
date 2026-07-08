import { BrowserContext, Locator, Page } from "@playwright/test";
import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";

/**
 * Page Object Model representing the Logout Page / Header Component.
 * Handles user session termination and account menu interactions.
 */
export class LogoutPage extends BrowserInteractionsImpl {

    /** Locator for the profile or user profile dropdown menu button. */
    userDropdownMenu: Locator;

    /** Locator for the logout button/link inside the user dropdown menu. */
    logoutOption: Locator;

    /**
     * Initializes the LogoutPage locators and calls the base interaction implementation constructor.
     * @param page - The active Playwright Page instance.
     * @param context - The active Playwright BrowserContext instance.
     */

    constructor(page: Page, context: BrowserContext) {
        super(page, context);

        this.userDropdownMenu = page.locator("(//div[@id='userDropdownMenu']/preceding::div)[3]");
        this.logoutOption = page.getByText("Logout");
    }

    /**
     * Clicks on the user profile dropdown menu to reveal available account actions.
     * @returns A promise that resolves when the dropdown menu is clicked.
     */

    async clickUserDropDownMenu(): Promise<void> {
        await this.click(this.userDropdownMenu, "userDropdownMenu");
    }

    /**
     * Clicks on the logout option to terminate the current user session.
     * @returns A promise that resolves when the logout action is complete.
     */
    async clickLogout(): Promise<void> {
        await this.forceClick(this.logoutOption, "LogoutOption");
    }
}
