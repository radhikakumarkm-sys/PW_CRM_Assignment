import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { DashboardOverviewPage } from "./DashboardOverviewPage";

/**
 * Page Object Model representing the Login Page.
 * Handles user authentication actions and initial dashboard verification.
 */
export class LoginPage extends BrowserInteractionsImpl {

    /** Locator for the username input text box. */
    username: Locator;

    /** Locator for the password input field. */
    password: Locator;

    /** Locator for the sign-in submit button. */
    signIn: Locator;

    /** Locator for the Contacts / Leads navigation text or element on the post-login dashboard. */
    contactLead: Locator;

    /**
     * Initializes the LoginPage locators and calls the base interaction implementation constructor.
     * @param page - The active Playwright Page instance.
     * @param context - The active Playwright BrowserContext instance.
     */
    constructor(page: Page, context: BrowserContext) {
        super(page, context);

        this.username = page.getByRole("textbox", { name: "Username" });
        this.password = page.locator("input[name='password']");
        this.signIn = page.getByRole("button", { name: "Sign In" });
        this.contactLead = page.getByText("Contacts / Leads");
    }

    /**
     * Enters the provided credential string into the username input field.
     * @param testData - The username text to fill.
     * @returns A promise that resolves when the username input action is complete.
     */
    async enterUsername(testData: string): Promise<void> {
        await this.fill(this.username, "Username", testData);
    }

    /**
     * Enters the provided credential string into the password input field.
     * @param testData - The password text to fill.
     * @returns A promise that resolves when the password input action is complete.
     */
    async enterPassword(testData: string): Promise<void> {
        await this.fill(this.password, "Password", testData)
    }

    /**
     * Clicks the sign-in button and executes post-login validation checks on the page title and dashboard visibility.
     * @param page - The active Playwright Page instance used for soft-asserting the post-login page title.
     * @returns A promise that resolves if the click succeeds and the post-login validations evaluate.
     */
    async clickSignIn(page: Page): Promise<DashboardOverviewPage> {
        await this.click(this.signIn, "SignIn");
        await expect.soft(page, "Dashboard overview page title not contains 'Dashboard'").toHaveTitle(/Dashboard/);
        await this.toBeVisible(this.contactLead, "Contact/Leads", "'Contacts / Leads' not displayed");
        return new DashboardOverviewPage(this.page, this.context);
    }
}
