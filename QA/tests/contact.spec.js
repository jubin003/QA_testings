import { test } from "@playwright/test"
import { Contactpage } from "../pageObjects/contact.po"
import { LoginPage } from "../pageObjects/login.po";

const testDataC= require ('../test_data/contactTest.json');
const testDataL = require('../test_data/loginTest.json');



test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const contact = new Contactpage(page);
    await contact.login(testDataL.validUser.userName, testDataL.validUser.password);

})

test.describe('adding valid contact details', () => {
    test('contact validation', async ({ page }) => {
        const contact = new Contactpage(page);
        await contact.contact(testDataC.validContact.fname, testDataC.validContact.lname,testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyContactField();
    });
})
test.describe('adding invalid contact details', () => {
    test('contact validation for empty fName', async ({ page }) => {
        const contact = new Contactpage(page);
        await contact.contact("", testDataC.validContact.lname,testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyInvalidContactField();
    });
    test('contact validation for empty lName', async ({ page }) => {
        const contact = new Contactpage(page);
        await contact.contact(testDataC.validContact.fname, "", testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyInvalidContactField();
    });
    test('contact validation for empty fName and lName', async ({ page }) => {
        const contact = new Contactpage(page);
        await contact.contact("", "", testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyInvalidContactField();
    });
})