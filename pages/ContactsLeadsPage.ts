import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { LogoutPage } from "./LogoutPage";
import { AddNewContactPage } from "./AddNewContactPage";

/**
 * Page Object Model representing the Contacts and Leads listing page.
 * Manages the interactions for adding, editing, updating, and verifying contact records.
 */
export class ContactsLeadsPage extends BrowserInteractionsImpl {

    /** Locator for the link or button that initiates adding a new contact record. */
    addNewContact: Locator;

    /** Locator for a specific created contact element matching text content labels. */
    createdContactLead: Locator;

    /** Locator targeting the action buttons used to open the record modification view. */
    editButton: Locator;

    /** Locator for the electronic mail address text input element inside the item modification modal. */
    editEmail: Locator;

    /** Locator for the form action submission button that commits modified contact changes. */
    saveChangesButton: Locator;

    /** Locator targeting the presentation column text displaying modified email identifiers. */
    updatedEmail: Locator;

    /**
     * Initializes the ContactsLeadsPage element locators and sets up the base class framework context.
     * @param page - The active Playwright Page instance.
     * @param context - The active Playwright BrowserContext instance.
     */
    constructor(page: Page, context: BrowserContext) {
        super(page, context);

        this.addNewContact = page.getByRole("link", { name: "Add New Contact" });
        this.createdContactLead = page.locator("//p[text()='Radhika']");
        this.editButton = page.locator("//table/tbody/tr/td/following-sibling::td/child::button[1]");
        this.editEmail = page.locator("#edit_email");
        this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });
        this.updatedEmail = page.locator("//table/tbody/tr/td/div/child::div/p[2]");
    }

    /**
     * Clicks on the link to trigger the creation form interface for inserting a new contact record.
     * @returns A promise that resolves when the add action link is clicked.
     */
    // async clickAddNewContact(): Promise<void> {
    //     await this.click(this.addNewContact, "AddNewContact");
    // }

    /**
     * Coordinates the interception of a newly generated page or pop-up context triggered by clicking the add button.
     * @param newContext - The active browser context target container monitoring multi-window occurrences.
     * @returns A promise that resolves to the newly opened form window context Page instance.
     */
    async ClickAddNewContact(): Promise<AddNewContactPage> {
        const newPage = await this.switchToPage(this.addNewContact);
        return new AddNewContactPage(newPage, this.context);
    }

    /**
     * Isolates and clicks the first available record manipulation item switch inside the contact data table.
     * @returns A promise that resolves when the modification selection button click action completes.
     */
    async clickEdit(): Promise<void> {
        const firstEditButoon = this.editButton.nth(0);
        await this.click(firstEditButoon, "EditButton");
    }

    /**
     * Clears out any existing data text and updates the email entry text box with new mock data information.
     * @param testData - The revised raw electronic mail string intended to replace old values.
     * @returns A promise that resolves once the text removal and insertion actions finish.
     */
    async editContact(testData: string): Promise<void> {
        await this.clear(this.editEmail, "EditEmail");
        await this.fill(this.editEmail, "EditEmail", testData)
    }

    /**
     * Submits updated form data changes and immediately assets that the matching data table text displays the correct value sequence.
     * @returns A promise that resolves if the update request commits and the interface validation checks pass.
     */
    async clickSaveChanges(): Promise<LogoutPage> {
        await this.click(this.saveChangesButton, "SaveChangesButton");
        const editedEmail = this.updatedEmail.nth(0);
        await this.toHaveText(editedEmail, "rk@gmail.com", "UpdatedEmail");
        return new LogoutPage(this.page, this.context);
    }

    /**
     * Configures a single-use modal listener to catch, validate, and dismiss an upcoming contact modification notice message.
     * @param page - The active target page interface container where the message modal pops up.
     * @returns A promise that resolves when the alert handling framework configuration step wraps up.
     */
    async contactUpdateSuccessAlert(page: Page): Promise<void> {
        await this.alertAccept(page, /Contact updated Successfully/i);
    }

    async verifyCreatedLead(): Promise<void> {
        await expect(this.page).toHaveTitle(/Contacts & Leads/i);
        const leadText = this.createdContactLead.nth(0);
        expect(leadText, "Created lead name not found in the list").toBeVisible();

    }

}
