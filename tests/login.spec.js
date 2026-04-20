import  {expect, test} from '@playwright/test';

test('valid login test',async({page})=>{
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('student');
    await page.locator("//input[@name='password']").fill('Password123');

    await page.locator("//button[@id='submit']").click();

    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
})

test('invalid login test using valid username',async({page})=>{
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('student');
    await page.locator("//input[@name='password']").fill('student');

    await page.locator("//button[@id='submit']").click();


    const error=page.locator("//div[@id='error']")
    await expect (error).toHaveText('Your password is invalid!');


    
})
test('invalid login test using invalid username', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('incorrectUser');
    await page.locator("//input[@name='password']").fill('Password123');

    await page.locator("//button[@id='submit']").click();

    const error = page.locator("//div[@id='error']")
    await expect(error).toHaveText('Your username is invalid!');
})

test('invalid login test using invalid username and invalid password', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('incorrectUser');
    await page.locator("//input[@name='password']").fill('incorrectPassword');

    await page.locator("//button[@id='submit']").click();

    const error = page.locator("//div[@id='error']")
    await expect(error).toHaveText('Your username is invalid!');
})

test('invalid login test using empty username', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('');
    await page.locator("//input[@name='password']").fill('Password123');

    await page.locator("//button[@id='submit']").click();

    const error = page.locator("//div[@id='error']")
    await expect(error).toHaveText('Your username is invalid!');
})

test('invalid login test using empty password', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('student');
    await page.locator("//input[@name='password']").fill('');

    await page.locator("//button[@id='submit']").click();

    const error = page.locator("//div[@id='error']")
    await expect(error).toHaveText('Your password is invalid!');
})

test('invalid login test using empty username and empty password', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator("//input[@name='username']").fill('');
    await page.locator("//input[@name='password']").fill('');

    await page.locator("//button[@id='submit']").click();

    const error = page.locator("//div[@id='error']")
    await expect(error).toHaveText('Your username is invalid!');
})