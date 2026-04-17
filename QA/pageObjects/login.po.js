const {expect}= require("@playwright/test");

exports.LoginPage= class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.usernameInput='#email';
        this.passwordinput='//input[@id="password"]';
        this.loginButton='//button[@id="submit"]';
        this.logOut='//button[@id="logout"]';
        this.loginValidation='//p[contains(test(),"Click on any contact to view the Contact Details")]';
        this.alertMessage='//span[@id="error"]';
    }

    async login(username,password){
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordinput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyValidLogin(){
        const loginValidation =await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(loginValidation).toHaveText('Click on any contact to view the Contact Details');
    }

    async verifyInvalidLogin(){
       const InvalidLogin =await this.page.locator(this.alertMessage);
        await expect(InvalidLogin).toHaveText('Incorrect username or password'); 
    }
}

