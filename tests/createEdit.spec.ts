import { expect, test } from "@playwright/test"

test(" Create Lead - TC001", async ({ page, context }) => {

    // 1. Navigate to https://apps.theauto-mate.com/crm/login.php

    await page.goto("https://apps.theauto-mate.com/crm/login.php");

    // 2. Login using test.automate / test@123

    await expect.soft(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await page.getByRole("textbox", { name: "Username" }).fill("test.automate");
    await expect.soft(page.locator("input[name='password']")).toBeVisible();
    await page.locator("input[name='password']").fill("test@123");
    await page.getByRole("button", { name: "Sign In" }).click();

    // 3. Verify Dashboard overview page is displayed using its title - /Dashboard/

    await expect.soft(page, "Dashboard overview page title not contains 'Dashboard'").toHaveTitle(/Dashboard/);

    // 4. Click Contacts/Leads

    await expect.soft(page.getByText("Contacts / Leads")).toBeVisible();
    await page.getByText("Contacts / Leads").click();

    // 5. Click Add New Contact

    const [addNewContactPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("link", { name: "Add New Contact" }).click()
    ]);

    // 6. Fill all the required details - Name, Email, Phone Number etc.,

    await addNewContactPage.locator("input[name ='contact_name']").fill("Radhika");
    await addNewContactPage.locator("input[name ='email']").fill("radhika@gmail.com");
    await addNewContactPage.locator("input[name='phone']").fill("9090909090");
    await addNewContactPage.locator("input[name='company']").fill("xyz company");
    await addNewContactPage.getByRole("radio", { name: "Female" }).check();

    //selectStatusDropDown
    const selectStatusDropDown = addNewContactPage.locator("select[name='status']");
    await selectStatusDropDown.selectOption({ value: "qualified" });

    //contactSourceDropDown
    const contactSourceDropDown = addNewContactPage.locator("select[name = 'source']");
    await contactSourceDropDown.selectOption({ value: "referral" });

    await addNewContactPage.locator("input[name = 'lead_score']").fill("1");
    await addNewContactPage.locator("input[name='deals']").fill("4");
    await addNewContactPage.locator("input[name='total_value']").fill("5");
    await addNewContactPage.getByLabel(" Support").check();

    //PriorityDropdown
    const priorityDropdown = addNewContactPage.locator("select[name='priority']");
    await priorityDropdown.selectOption({ value: "high" });

    //Last_contact calender

    await addNewContactPage.locator("input[name='last_contact']").fill("2026-06-09");
    await addNewContactPage.locator("textarea[name='notes']").fill("Information Added Successfully");

    // 7. Click Add

    await addNewContactPage.getByText("Add", { exact: true }).click();

    // 8. Verify “Lead Added Successfully” text is displayed

    await expect.soft(addNewContactPage.getByText("Lead added successfully!"), "Lead added successfully! message not displayed").toBeVisible();

    // 9. Verify created lead name is displayed in Contacts/Leads page

    await expect.soft(page).toHaveTitle(/Training - Contacts & Leads/);
    // const leadText = await page.locator("(//div[@class='flex items-center gap-3'])[2]/div[2]/child::p[1]").innerText();
    const leadText = await page.locator("//p[text()='Radhika']").nth(0).innerText();

    console.log(`leadText is : ${leadText}`);
    expect(leadText).toEqual("Radhika");


})


test("Edit Lead - TC002", async ({ page, context }) => {


    // 1. Navigate to https://apps.theauto-mate.com/crm/login.php

    await page.goto("https://apps.theauto-mate.com/crm/login.php");

    // 2. Login using test.automate / test@123

    await expect.soft(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await page.getByRole("textbox", { name: "Username" }).fill("test.automate");
    await expect.soft(page.locator("input[name='password']")).toBeVisible();
    await page.locator("input[name='password']").fill("test@123");
    await page.getByRole("button", { name: "Sign In" }).click();

    // 3. Click Contacts/Leads
    await expect.soft(page.getByText("Contacts / Leads")).toBeVisible();
    await page.getByText("Contacts / Leads").click();

    // 4. Click Edit on the lead created in TC001

    await page.locator("//p[text()='Radhika']/ancestor::td/following-sibling::*[9]/button[text()='Edit']").nth(0).click();

    // 5. Edit email

    await page.locator("input[id='edit_email']").clear();
    await page.locator("input[id='edit_email']").fill("rk@gmail.com");

    // 6. Click save changes
    // 7. Verify “Contact updated Successfully” dialog is displayed
    // 8. Click on Ok in dialog

    //listener
    page.once("dialog", async (dialog) => {
        const alertMsg = dialog.message();
        expect(alertMsg).toMatch(/Contact updated Successfully/i);
        console.log(`ALERT MESSAGE : ${alertMsg}`);
        const alertType = dialog.type();
        console.log(`ALERT TYPE : ${alertType}`);
        await dialog.accept();                                         // Click on Ok in dialog
    })

    await page.getByRole("button", { name: "Save Changes" }).click();  //Click save changes


    // 9. Verify updated email is displayed for the corresponding lead

    const updatedEmail = expect.soft(page.locator("//table/tbody/tr/td/div/child::div/p[2]").nth(0), "Not able to locate this locator");
    await updatedEmail.toHaveText(/rk@gmail.com/i);

    await page.pause();

})