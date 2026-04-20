import { test } from "@playwright/test"
import { ContactPage } from "../pageObjects/contact.po.js"
import { LoginPage } from "../pageObjects/login.po.js";
import { authenticateUser, createEntity, deleteEntity, getEntity, validateEntity } from '../utils/helper.spec.js'
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testDataC = JSON.parse(readFileSync(join(__dirname, '../test_data/contactTest.json'), 'utf8'));
const testDataL = JSON.parse(readFileSync(join(__dirname, '../test_data/loginTest.json'), 'utf8'));



test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const contact = new ContactPage(page);
    await contact.login(testDataL.validUser.userName, testDataL.validUser.password);

})

test.describe('adding valid contact details', () => {
    test('contact validation', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact(testDataC.validContact.fname, testDataC.validContact.lname, testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyContactField();
    });
})
test.describe('adding invalid contact details', () => {
    test('contact validation for empty fName', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact("", testDataC.validContact.lname, testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyInvalidContactField();
    });
    test('contact validation for empty lName', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact(testDataC.validContact.fname, "", testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyInvalidContactField();
    });
    test('contact validation for empty fName and lName', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact("", "", testDataC.validContact.email, testDataC.validContact.phone);
        await contact.verifyInvalidContactField();
    });

    test('contact edit test', async ({ page, request }) => {
        const Data = {
            "firstName": 'jhon',
            "lastName": 'Mon',
            "email": "jhonmon@gmail.com",
            "phone": "9898989898",
            "country": "nepal",
            "city": 'city',
            'birthdate': '1990-09-12',
            'street1': 'address1',
            'postalCode': '12345'
        };
        const contact = new ContactPage(page);
        const accessToken = await authenticateUser(testDataL.validUser.userName, testDataL.validUser.password, { request });
        await createEntity(Data, accessToken, '/contacts', { request });
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(testDataC.contactEdit.firstName);
        // await contact.validContactCreated(contactTestData.contactEdit.firstName,
        //     contactTestData.contact.lastName,contactTestData.contact.email);
        const id = await getEntity(accessToken, '/contacts', '200', { request });
        await deleteEntity(accessToken, `/contacts/${id}`, { request });
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    });

    test('Contact delete test', async ({ page, request }) => {
        const Data = {
            "firstName": 'jhon',
            "lastName": 'Mon',
            "email": "jhonmon@gmail.com",
            "phone": "9898989898",
            "country": "nepal",
            "city": 'city',
            'birthdate': '1990-09-12',
            'street1': 'address1',
            'postalCode': '12345'
        };
        const contact = new ContactPage(page);
        const accessToken = await authenticateUser(testDataL.validUser.userName, testDataL.validUser.password, { request });
        const id = await createEntity(Data, accessToken, '/contacts', { request });
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(testDataC.contactEdit.firstName);
        await deleteEntity(accessToken, `/contacts/${id}`, { request });
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    })
})

