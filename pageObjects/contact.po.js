import { expect } from '@playwright/test';
import { LoginPage } from './login.po.js';

export class ContactPage {
    constructor(page) {
        this.page = page;
        this.addContactBtn = '//button[@id="add-contact"]';
        this.fName = '//input[@id="firstName"]';
        this.lName = '//input[@id="lastName"]';
        this.email = '//input[@id="email"]';
        this.phone = '//input[@id="phone"]';
        this.add = '//button[@id="submit"]';
        this.contactValidation = '(//td[@hidden="true"])[1]';
        this.usernameInput = '#email';
        this.passwordInput = '#password';
        this.logInButton = '//button[@id="submit"]';
        this.error = '//span[@id="error"]';
        this.savedFirstName = '//span[@id="firstName"]'; // assuming
        this.savedLastName = '//span[@id="lastName"]';
        this.savedEmail = '//span[@id="email"]';
        this.savedPhone = '//span[@id="phone"]';
        this.viewCreatedContact = '(//tr[@class="contactTableBodyRow"])[1]'; // assuming first contact
        this.editContact = '//button[@id="edit-contact"]';
        this.firstName = '//input[@id="firstName"]'; // same as fName
        this.Save = '//button[@id="submit"]';
        this.deleteContact = '//button[@id="delete"]'; // assuming
    }
    async contact(fName,lName,email,phone){
        await this.page.locator(this.addContactBtn).click();
        await this.page.locator(this.fName).fill(fName);
        await this.page.locator(this.lName).fill(lName);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.add).click();
    }
    async login(user,pw){
        await this.page.locator(this.usernameInput).fill(user);
        await this.page.locator(this.passwordInput).fill(pw);
        await this.page.locator(this.logInButton).click();
    }
    async verifyContactField(){
        const contactValidation = await this.page.locator(this.contactValidation);
        await expect(this.page.locator(this.addContactBtn)).toBeVisible();
        await expect(contactValidation).toContainText('69e');
    }
    async verifyInvalidContactField(){
        const invalidContact = await this.page.locator(this.error);
        await expect(invalidContact).toContainText("Contact validation failed:")
    }

    async validateContactCreated(fName,lName,email,phone){
        const fNameValidation = await this.page.locator(this.savedFirstName);
        const lNameValidation = await this.page.locator(this.savedLastName);
        const emailValidation = await this.page.locator(this.savedEmail);
        const phoneValidation = await this.page.locator(this.savedPhone);
    }

    async viewContact() {

        await this.page.locator(this.viewCreatedContact).click();
        
    }

    async contactEdit(firstName){
        await this.page.locator(this.editContact).click();
        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.Save).click();
    }

    async contactDelete(){
        await this.page.waitForTimeout(2000);
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.page.locator(this.deleteContact).click();
    }
}