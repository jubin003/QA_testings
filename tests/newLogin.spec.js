import {test} from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testData = JSON.parse(readFileSync(join(__dirname, '../test_data/loginTest.json'), 'utf8'));

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test.describe('Valid login tests',()=>{
    test('Login using valid username and password', async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.validUser.userName,testData.validUser.password);
        await login.verifyValidLogin();
    });
})

test.describe('Invalid login tests',()=>{
    test('Loginusing invalid username and valid password', async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.userName,testData.validUser.password);
        await login.verifyInvalidLogin();
    })

    test('Login using valid username and invalid password',async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.validUser.userName,testData.invalidUser.password);
        await login.verifyInvalidLogin();
    })

    test('Login using invalid username and invalid password',async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.userName,testData.invalidUser.password);
        await login.verifyInvalidLogin();
    })
    test('Login using no username and no password and click login',async({page})=>{
        const login=new LoginPage(page);
        await login.login("","");
        await login.verifyInvalidLogin();
    })
})

