"use strict";

require("chromedriver");
const { Builder, By, Key, until, Button } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const RegisterPage = require("../pages/register.page");
const LoginPage = require("../pages/login.page");
const ShoppingCart = require("../pages/shoppingCart.page");

describe.only("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageRegisterPage;
    let pageLoginPage;
    let pageShoppingCart;

    before(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        pageHomepage = new HomePage(driver);
        pageRegisterPage = new RegisterPage(driver);
        pageLoginPage = new LoginPage(driver);
        pageShoppingCart = new ShoppingCart(driver);
        
    });

      /*after(async function() {
        await driver.quit();
    });*/

    it("Verify homepage is open", async function() {
        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("(QA) Shop");
        expect(await pageHomepage.isBugListDivDisplayed()).to.be.true;
    });
    
    it("Clicks on register link", async () => {
        await pageHomepage.getRegisterLink();
        const registerPage = await pageHomepage.getRegisterURL();
        expect(await registerPage).to.eql("http://shop.qa.rs/register");
    })

    it("Fillout Register form", async () => {
      const registerButtonDisplayed = await pageRegisterPage.isRegisterButtonDisplayed();
      expect(await registerButtonDisplayed.isDisplayed()).to.be.true;

      await pageRegisterPage.getFirstnameField("bob");
      await pageRegisterPage.getLastnameField("buttons");
      await pageRegisterPage.getEmailField("bob.buttons@example.local");
      await pageRegisterPage.getUsernameField("bob.buttons");
      await pageRegisterPage.getPasswordField("password123");
      await pageRegisterPage.getPasswordConformationField("password123");

      await pageRegisterPage.getRegisterButton();

      const successMessage = await pageRegisterPage.getSuccessRegistredMessage();
      expect(await successMessage).to.contain("Uspeh!");


    })

    it("Clicks on Sign in link", async () => {
        await pageHomepage.getSignInLink();
        const loginPageURL = await pageLoginPage.getLoginPageURL();
        expect(await loginPageURL).to.eql("http://shop.qa.rs/login");
    })

    it("Fillout login informations", async () => {
        const loginButtonDisplayed = await pageLoginPage.isLoginButtonDisplayed();
        expect(await loginButtonDisplayed.isDisplayed()).to.be.true;

        await pageLoginPage.getKorisnickoImeField("aaa");
        await pageLoginPage.getLozinkaField("aaa");
        await pageLoginPage.getUlogujSeButton();

        const loginMessage = await pageHomepage.isLoginMessageDisplayed();
        expect(await loginMessage.isDisplayed()).to.be.true;

    })


    it("order bugs - STARTERPACK 2 items", async() => {
        
        const logoutButtonDisplayed = await pageHomepage.isLogoutButtonDisplayed();
        expect(await logoutButtonDisplayed.isDisplayed()).to.be.true;

        await pageHomepage.ClickStarterPackQuantity();
        await pageHomepage.ClickOption2StarterPack();
        await pageHomepage.ClickOrderNowButtonStarterPack();

        const shoppingCartUrl = pageShoppingCart.getShoppingCartURL();
        expect(await shoppingCartUrl).to.eql("http://shop.qa.rs/order");

        

    })

});
