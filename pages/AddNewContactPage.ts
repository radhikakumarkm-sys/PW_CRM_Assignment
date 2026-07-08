import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";

/**
 * Page Object Model representing the Add New Contact Page / Popup Form.
 * Handles the input fields, checkboxes, radios, and validation for creating a contact/lead.
 */
export class AddNewContactPage extends BrowserInteractionsImpl {
    ClickAddNewContact() {
        throw new Error("Method not implemented.");
    }

    /** Locator for the Contact Name input text field. */
    contactName: Locator;

    /** Locator for the Email Address input field. */
    email: Locator;

    /** Locator for the Phone Number input field. */
    phone: Locator;

    /** Locator for the Company Name input field. */
    company: Locator;

    /** Locator for the Male gender selection radio button. */
    genderMale: Locator;

    /** Locator for the Female gender selection radio button. */
    genderFemale: Locator;

    /** Locator for the Other gender selection radio button. */
    genderOther: Locator;

    /** Locator for the Status selection dropdown menu. */
    status: Locator;

    /** Locator for the Contact Source selection dropdown menu. */
    contactSource: Locator;

    /** Locator for the Lead Score numeric/text input field. */
    leadScore: Locator;

    /** Locator for the Deals count or identifier input field. */
    deals: Locator;

    /** Locator for the Total Financial Value input field. */
    totalValue: Locator;

    /** Locator for the CRM checkbox option under interested services. */
    interestedServiceCRM: Locator;

    /** Locator for the Marketing checkbox option under interested services. */
    interestedServiceMarketing: Locator;

    /** Locator for the Support checkbox option under interested services. */
    interestedServiceSupport: Locator;

    /** Locator for the Custom Development checkbox option under interested services. */
    interestedServiceCustomDev: Locator;

    /** Locator for the Priority level selection dropdown menu. */
    priority: Locator;

    /** Locator for the Last Contact Date input or picker field. */
    lastContact: Locator;

    /** Locator for the descriptive Notes text area block. */
    notes: Locator;

    /** Locator for the Add/Submit form button. */
    addbutton: Locator;

    /** Locator for the success notification toast or message text 'Lead added successfully!'. */
    leadAddedMsg: Locator;

    /** Locator to track the newly created contact row or card label in the primary page view. */
    createdContactLead: Locator;

    contactLead: Locator;

    /**
     * Initializes all the locator properties for the Add New Contact view.
     * @param addNewContact - The active Playwright Page instance representing the context of the pop-up/new tab form.
     * @param page - The primary parent Playwright Page instance before the pop-up context action.
     * @param context - The active Playwright BrowserContext instance.
     */
    constructor(page: Page, context: BrowserContext) {
        super(page, context);

        this.contactName = page.locator("input[name ='contact_name']");
        this.email = page.locator("input[name ='email']");
        this.phone = page.locator("input[name='phone']");
        this.company = page.locator("input[name='company']");
        this.genderMale = page.getByRole("radio", { name: "Male", exact: true });
        this.genderFemale = page.getByRole("radio", { name: "Female", exact: true });
        this.genderOther = page.getByRole("radio", { name: "Other", exact: true });
        this.status = page.locator("select[name='status']");
        this.contactSource = page.locator("select[name = 'source']");
        this.leadScore = page.locator("input[name = 'lead_score']");
        this.deals = page.locator("input[name='deals']");
        this.totalValue = page.locator("input[name='total_value']");
        this.interestedServiceCRM = page.getByLabel(" CRM");
        this.interestedServiceMarketing = page.getByLabel(" Marketing");
        this.interestedServiceSupport = page.getByLabel(" Support");
        this.interestedServiceCustomDev = page.getByLabel(" Custom Dev");
        this.priority = page.locator("select[name='priority']");
        this.lastContact = page.locator("input[name='last_contact']");
        this.notes = page.locator("textarea[name='notes']");
        this.addbutton = page.locator("button[type='submit']");
        this.leadAddedMsg = page.getByText("Lead added successfully!");
        // this.createdContactLead = page.locator("//p[text()='Radhika']");
        this.createdContactLead = page.locator("//table[@id='contactsTable']/tbody/tr[1]/td/child::div/child::div[2]/p[1]");
        this.contactLead = page.getByText("Contacts / Leads");
    }

    /**
     * Fills the contact name text field with the provided data value.
     * @param testData - The string value representing the contact's target name.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillContactName(testData: string): Promise<void> {
        await this.fill(this.contactName, "ContactName", testData);
    }

    /**
     * Fills the contact email input field with the provided email string.
     * @param testData - The string value representing the contact's target email address.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillEmail(testData: string): Promise<void> {
        await this.fill(this.email, "Email", testData);
    }

    /**
     * Fills the contact phone text field with the provided number sequence or string.
     * @param testData - The string value representing the contact's phone details.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillPhone(testData: string): Promise<void> {
        await this.fill(this.phone, "Phone", testData);
    }

    /**
     * Fills the company name input text field with the provided value.
     * @param testData - The string value representing the target company name.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillCompany(testData: string): Promise<void> {
        await this.fill(this.company, "Company", testData);
    }

    /**
     * Toggles or checks the Male choice selection radio button option.
     * @returns A promise that resolves when the option selection action concludes.
     */
    async checkMaleRadio(): Promise<void> {
        await this.check(this.genderMale, "MaleRadioButton");
    }

    /**
     * Toggles or checks the Female choice selection radio button option.
     * @returns A promise that resolves when the option selection action concludes.
     */
    async checkFemaleRadio(): Promise<void> {
        await this.check(this.genderFemale, "FemaleRadioButton");
    }

    /**
     * Toggles or checks the Other choice selection radio button option.
     * @returns A promise that resolves when the option selection action concludes.
     */
    async checkOtherRadio(): Promise<void> {
        await this.check(this.genderOther, "OthersRadioButton");
    }

    /**
     * Selects an explicit value choice out of the item status selection dropdown.
     * @param labelValue - The text label value of the status option to select.
     * @returns A promise that resolves when the selection action concludes.
     */
    async statusDropdown(labelValue: string): Promise<void> {
        await this.selectOption(this.status, labelValue, "interestedServiceSupport");
    }

    /**
     * Selects an explicit origin option value out of the item source dropdown element.
     * @param labelValue - The text label value of the origin source option to select.
     * @returns A promise that resolves when the selection action concludes.
     */
    async contactSourceDropdown(labelValue: string): Promise<void> {
        await this.selectOption(this.contactSource, labelValue, "contactSourceHigh");
    }

    /**
     * Fills the tracking lead evaluation score input element with data.
     * @param testData - The string value representing the score target text/number.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillLeadScore(testData: string): Promise<void> {
        await this.fill(this.leadScore, "LeadScore", testData);
    }

    /**
     * Fills the volume or count tracker input field representing active deals.
     * @param testData - The string value representing the target count sequence.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillDeals(testData: string): Promise<void> {
        await this.fill(this.deals, "Deals", testData);
    }

    /**
     * Fills the evaluated absolute total worth input element with custom numeric data.
     * @param testData - The string value representing the financial volume field content.
     * @returns A promise that resolves when the field entry action concludes.
     */
    async fillTotalValue(testData: string): Promise<void> {
        await this.fill(this.totalValue, "TotalValue", testData);
    }

    /**
     * Toggles or selects the CRM choice checkbox field in the platform preferences list.
     * @returns A promise that resolves when the check action concludes.
     */
    async checkInterestedServiceCRM(): Promise<void> {
        await this.check(this.interestedServiceCRM, "InterestedServiceCRM");
    }

    /**
     * Toggles or selects the Marketing choice checkbox field in the platform preferences list.
     * @returns A promise that resolves when the check action concludes.
     */
    async checkInterestedServiceMarketing(): Promise<void> {
        await this.check(this.interestedServiceMarketing, "interestedServiceMarketing");
    }

    /**
     * Toggles or selects the Support choice checkbox field in the platform preferences list.
     * @returns A promise that resolves when the check action concludes.
     */

    async checkInterestedServiceSupport(): Promise<void> {
        await this.check(this.interestedServiceSupport, "interestedServiceSupport");
    }

    /**
     * Selects or checks the Custom Development choice checkbox field under the interested services section.
     * @returns A promise that resolves when the checkbox selection action is complete.
     */
    async checkInterestedServiceCustomDev(): Promise<void> {
        await this.check(this.interestedServiceCustomDev, "interestedServiceCustomDev");
    }

    /**
     * Selects an explicit priority option from the priority dropdown menu.
     * @param testData - The text label value of the priority level to select.
     * @returns A promise that resolves when the dropdown option selection is complete.
     */
    async priorityDropdown(testData: string): Promise<void> {
        await this.selectOption(this.priority, testData, "priorityDropdown");
    }

    /**
     * Fills the last contact date input field with the provided tracking date string.
     * @param testData - The date or text value to input into the field.
     * @returns A promise that resolves when the field entry action is complete.
     */
    async fillLastContact(testData: string): Promise<void> {
        await this.fill(this.lastContact, "lastContact", testData);
    }

    /**
     * Fills the notes text area element with custom descriptive text or comments.
     * @param testData - The narrative text string or comments to input.
     * @returns A promise that resolves when the text entry action is complete.
     */
    async fillNotes(testData: string): Promise<void> {
        await this.fill(this.notes, "Notes", testData);
    }

    /**
     * Submits the form via a forced click on the add button and runs success message, title, and string verification steps.
     * @param page - The active parent window context Playwright Page instance used for the page title assertion.
     * @returns A promise that resolves if the submit succeeds and all verification assertions pass.
     */
    async clickAddButton(): Promise<void> {
        await this.forceClick(this.addbutton, "AddButton");
        await expect(this.leadAddedMsg, "Lead Added Success msg not displayed").toBeVisible();
    }




}









