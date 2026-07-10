import { test } from "../../Custom Fixtures/customFixCRM"
import { LoginPage } from "../../pages/LoginPage";
import { faker } from '@faker-js/faker';
import { FakerData } from "../../utils/FakerUtils"

test(" Create & Edit Lead - CRM1", async ({ page, dashboardPage, contactsLeadsPage }) => {

    test.setTimeout(60000);

    //Used Fixture to cover from LOGIN to ClickADDnewContact

    // Fill all the required details - Name, Email, Phone Number etc.,

    await contactsLeadsPage.fillContactName("Radhika");
    await contactsLeadsPage.fillEmail(FakerData.getEmail());         //Get input from FakerData
    await contactsLeadsPage.fillPhone("9090909090");
    await contactsLeadsPage.fillCompany(FakerData.getCompany());     //Get input from FakerData
    await contactsLeadsPage.checkFemaleRadio();

    // selectStatusDropDownS

    await contactsLeadsPage.statusDropdown("Active");

    // contactSourceDropDown

    await contactsLeadsPage.contactSourceDropdown("Social Media");
    await contactsLeadsPage.fillLeadScore("1");
    await contactsLeadsPage.fillDeals("4");
    await contactsLeadsPage.fillTotalValue("5");
    await contactsLeadsPage.checkInterestedServiceCustomDev();

    // PriorityDropdown
    await contactsLeadsPage.priorityDropdown("High");

    // Last_contact calender

    await contactsLeadsPage.fillLastContact("2026-06-09");
    await contactsLeadsPage.fillNotes("Information Added Successfully");

    // Click Add
    // Verify “Lead Added Successfully” text is displayed
    // Verify created lead name is displayed in Contacts/Leads page

    await contactsLeadsPage.clickAddButton();

    await dashboardPage.verifyCreatedLead();

    // Click Edit on the lead created in TC001

    await dashboardPage.clickEdit();

    // Edit email

    await dashboardPage.editContact("rk@gmail.com");

    // Click save changes
    // Verify “Contact updated Successfully” dialog is displayed
    // Click on Ok in dialog
    // Verify updated email is displayed for the corresponding lead

    // listener
    await dashboardPage.contactUpdateSuccessAlert(page);  // Click on Ok in dialog
    const logoutPage = await dashboardPage.clickSaveChanges(); //Click save changes

    // Logout

    await logoutPage.clickUserDropDownMenu();
    await logoutPage.clickLogout();


})

