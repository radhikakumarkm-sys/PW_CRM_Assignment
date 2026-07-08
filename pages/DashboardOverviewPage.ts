import { BrowserContext, Locator, Page } from "@playwright/test";
import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { ContactsLeadsPage } from "./ContactsLeadsPage";

/**
 * Page Object Model representing the Dashboard Overview Page.
 * Handles navigation and main dashboard widget interactions.
 */
export class DashboardOverviewPage extends BrowserInteractionsImpl {

    /** Locator for the Contacts / Leads navigation tab or sidebar entry. */
    contactLead: Locator;

    /**
     * Initializes the DashboardOverviewPage locators and calls the base interaction implementation constructor.
     * @param page - The active Playwright Page instance.
     * @param context - The active Playwright BrowserContext instance.
     */

    constructor(page: Page, context: BrowserContext) {
        super(page, context);

        this.contactLead = page.getByText("Contacts / Leads");
    }

    /**
     * Clicks on the Contacts / Leads option to navigate to the contacts management section.
     * @returns A promise that resolves when the navigation link click action is complete.
     */
    async clickContactLeads(): Promise<ContactsLeadsPage> {
        await this.click(this.contactLead, "ContactLeads");
        return new ContactsLeadsPage(this.page, this.context);
    }

}
