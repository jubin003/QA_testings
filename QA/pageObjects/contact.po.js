const {expect}= require('@playwright/test')
import { LoginPage } from './login.po';

exports.Contactpage= class ContactPage{
    constructor(page)
    {
        this.page=page;
        this.addContactBtn='//button[@id="add-contact"]';
        this.fName='//input[@id="firstName"]';
        this.lName='//input[@id="lastName"]';
        this.email='//input[@id="email"]';
        this.phone='//input[@id="phone"]';
        this.add='//button[@id="submit"]';
        this.contactValidation='(//td[@hidden="true"])[1]'
        this.usernameInput='#email';
        this.passwordInput='//input[@placeholder="Password"]';
        this.logInButton='//button[@id="submit"]';
        this.error='//span[@id="error"]';
    }
    async contact(fName,lName,email,phone){
        await this.page.waitForTimeout(2000);
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
        await this.page.waitForTimeout(2000);
        expect(this.addContactBtn).toBeVisible;
        await expect(contactValidation).toContainText('69e');
    }
    async verifyInvalidContactField(){
        const invalidContact = await this.page.locator(this.error);
        await expect(invalidContact).toContainText("Contact validation failed:")
    }

    // async validateContactCreated(fName,lName,email,phone){
    //     const fNameValidation = await this.page.locator(this.savedFirstName);
    //     const lNameValidation = await this.page.locator(this.savedLastName);
    //     const emailValidation = await this.page.locator(this.savedEmail);
    //     const phoneValidation = await this.page.locator(this.savedphone);
    // }

    
}