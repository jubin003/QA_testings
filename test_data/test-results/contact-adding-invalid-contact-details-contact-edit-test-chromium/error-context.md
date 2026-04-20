# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.js >> adding invalid contact details >> contact edit test
- Location: tests\contact.spec.js:45:10

# Error details

```
ReferenceError: ContactPage is not defined
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Contact List App" [level=1] [ref=e2]
  - generic [ref=e3]: Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down.
  - generic [ref=e4]:
    - text: The API documentation can be found
    - link "here" [ref=e5] [cursor=pointer]:
      - /url: https://documenter.getpostman.com/view/4012288/TzK2bEa8
    - text: .
  - generic [ref=e6]:
    - paragraph [ref=e7]: "Log In:"
    - generic [ref=e8]:
      - paragraph [ref=e9]:
        - textbox "Email" [ref=e10]
      - paragraph [ref=e11]:
        - textbox "Password" [ref=e12]
      - paragraph [ref=e13]:
        - button "Submit" [ref=e14]
    - paragraph [ref=e15]: Not yet a user? Click here to sign up!
    - button "Sign up" [ref=e16]
  - contentinfo [ref=e17]:
    - paragraph [ref=e18]: Created by Kristin Jackvony, Copyright 2021
    - img [ref=e19]
```

# Test source

```ts
  1  | import { test } from "@playwright/test"
  2  | import { Contactpage } from "../pageObjects/contact.po"
  3  | import { LoginPage } from "../pageObjects/login.po";
  4  | import { access } from "node:fs";
  5  | import { getEnabledCategories } from "node:trace_events";
  6  | 
  7  | const {authenticateUser,createEntity,deleteEntity,getEntity,validateEntity} = require('../utils/helper.spec.js')
  8  | 
  9  | const testDataC= require ('../test_data/contactTest.json');
  10 | const testDataL = require('../test_data/loginTest.json');
  11 | 
  12 | 
  13 | 
  14 | test.beforeEach(async ({ page }) => {
  15 |     await page.goto('/');
> 16 |     const contact = new ContactPage(page);
     |                     ^ ReferenceError: ContactPage is not defined
  17 |     await contact.login(testDataL.validUser.userName, testDataL.validUser.password);
  18 | 
  19 | })
  20 | 
  21 | test.describe('adding valid contact details', () => {
  22 |     test('contact validation', async ({ page }) => {
  23 |         const contact = new Contactpage(page);
  24 |         await contact.contact(testDataC.validContact.fname, testDataC.validContact.lname,testDataC.validContact.email, testDataC.validContact.phone);
  25 |         await contact.verifyContactField();
  26 |     });
  27 | })
  28 | test.describe('adding invalid contact details', () => {
  29 |     test('contact validation for empty fName', async ({ page }) => {
  30 |         const contact = new Contactpage(page);
  31 |         await contact.contact("", testDataC.validContact.lname,testDataC.validContact.email, testDataC.validContact.phone);
  32 |         await contact.verifyInvalidContactField();
  33 |     });
  34 |     test('contact validation for empty lName', async ({ page }) => {
  35 |         const contact = new Contactpage(page);
  36 |         await contact.contact(testDataC.validContact.fname, "", testDataC.validContact.email, testDataC.validContact.phone);
  37 |         await contact.verifyInvalidContactField();
  38 |     });
  39 |     test('contact validation for empty fName and lName', async ({ page }) => {
  40 |         const contact = new Contactpage(page);
  41 |         await contact.contact("", "", testDataC.validContact.email, testDataC.validContact.phone);
  42 |         await contact.verifyInvalidContactField();
  43 |     });
  44 | 
  45 |     test.only('contact edit test',async({page,request})=>{
  46 |         const Data={
  47 |             "firstName": 'jhon',
  48 |             "lastName":'Doe',
  49 |             "email":"jhondoes@gmail.com",
  50 |             "phone":"90909090909",
  51 |             "country": "nepal",
  52 |             "city":'city',
  53 |             'birthdate':'1990-09-12',
  54 |             'street1':'address1',
  55 |             'postalCode':'12345'
  56 |             };
  57 |         const contact = new ContactPage(page);
  58 |         accessToken = await authenticateUser(testDataL.validUser.userName, testDataL.validUser.password,{request});
  59 |         await createEntity(Data,accessToken,'/contacts',{request});
  60 |         page.reload();
  61 |         await contact.viewContact();
  62 |         await contact.contactEdit(contactTestData.contactEdit.firstName);
  63 |         // await contact.validContactCreated(contactTestData.contactEdit.firstName,
  64 |         //     contactTestData.contact.lastName,contactTestData.contact.email);
  65 |         const id = await getEntity(accessToken,'/contact','200',{request});
  66 |         await deleteEntity(accessToken,`/contact/${id}`,{request});
  67 |         await validateEntity(accessToken,`/contact/${id}`,'400',{request});
  68 | 
  69 | 
  70 |         
  71 |         
  72 |     })
  73 | })
  74 | 
  75 | 
```