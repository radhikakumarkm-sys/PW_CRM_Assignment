import { test as base } from "@playwright/test"
import { DashboardOverviewPage } from "../pages/DashboardOverviewPage";
import { LoginPage } from "../pages/LoginPage";
import { AddNewContactPage } from "../pages/AddNewContactPage";
import { ContactsLeadsPage } from "../pages/ContactsLeadsPage";


// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: DashboardOverviewPage;
    dashboardPage: ContactsLeadsPage;
    contactsLeadsPage: AddNewContactPage;

};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page, context }, use) => {


        // Navigate to https://apps.theauto-mate.com/crm/login.php

        await page.goto(process.env.CRM_URL as string);

        // Login using test.automate / test@123
        // Verify Dashboard overview page is displayed using its title - /Dashboard/

        const loginPage = new LoginPage(page, context);
        await loginPage.enterUsername(process.env.CRM_USERNAME as string);
        await loginPage.enterPassword(process.env.CRM_PASSWORD as string);
        const dashboardOverviewPage = await loginPage.clickSignIn(page);

        await use(dashboardOverviewPage);
    },

    dashboardPage: async ({ loginPage }, use) => {

        // Click Contacts/Leads

        const contactsLeadsPage = await loginPage.clickContactLeads();

        await use(contactsLeadsPage);

    },
    contactsLeadsPage: async ({ dashboardPage }, use) => {

        // Click Add New Contact

        const addNewContactPage = await dashboardPage.ClickAddNewContact();

        await use(addNewContactPage);

    }








})

