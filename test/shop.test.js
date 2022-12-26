"use strict";

require("chromedriver");
const { Builder, By, Key, until, Button } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pagesShop/home.page");
const RegisterPage = require("../pagesShop/register.page");
const LoginPage = require("../pagesShop/login.page");
const ShoppingCart = require("../pagesShop/shoppingCart.page");
const CheckoutPage = require("../pagesShop/checkout.page");
const BasePage = require("../pagesShop/base.page");
const HistoryPage = require("../pagesShop/history.page");

describe("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageRegisterPage;
    let pageLoginPage;
    let pageShoppingCart;
    let pageCheckout;
    let pageBasepage;
    let pageHistory;

    let pacakgeToAdd = 'starter';
    let packageQuantity = '2';

    before(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        pageHomepage = new HomePage(driver);
        pageRegisterPage = new RegisterPage(driver);
        pageLoginPage = new LoginPage(driver);
        pageShoppingCart = new ShoppingCart(driver);
        pageCheckout = new CheckoutPage(driver);
        pageBasepage = new BasePage(driver);
        pageHistory = new HistoryPage(driver);
        
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


    /*it("order bugs - STARTERPACK 2 items", async() => {
        
        const logoutButtonDisplayed = await pageHomepage.isLogoutButtonDisplayed();
        expect(await logoutButtonDisplayed.isDisplayed()).to.be.true;

        await pageHomepage.ClickStarterPackQuantity();
        await pageHomepage.ClickOption2StarterPack();
        await pageHomepage.ClickOrderNowButtonStarterPack();

        const shoppingCartUrl = pageShoppingCart.getShoppingCartURL();
        expect(await shoppingCartUrl).to.eql("http://shop.qa.rs/order");

        

    })*/


    it("Adds item to cart - STARTER 2 items", async() => {
    await pageHomepage.goToPage();
    const packageDiv = await pageHomepage.getPackageDiv(pacakgeToAdd);
    const quantity = await pageHomepage.getQuantityDropdown(packageDiv);
    const options = await pageHomepage.getOptions(quantity);

    await Promise.all(options.map(async (option) => {
        const text = await option.getText();

        if (text === packageQuantity) {
            await option.click();

            const selectedValue = await quantity.getAttribute('value');
            expect(selectedValue).to.contain(packageQuantity);

            const buttonOrder = await pageHomepage.getOrderButton(packageDiv);
            await buttonOrder.click();

            expect(await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/order');
        }
    }));
    })

    it("Verify that shopping cart page is opened", async() => {
        const header = await pageHomepage.getHeader();
        expect(await header.getText()).to.contain("Order");

        await pageHomepage.clickOnViewShoppingCartLink();

        await driver.wait(until.elementLocated(By.name("checkout")));
        
        expect(await driver.getCurrentUrl()).to.eql("http://shop.qa.rs/cart");
    })

    it("Verify name and quantity of packages", async() => {
        const orderRow = await pageShoppingCart.getOrderRow(pacakgeToAdd.toUpperCase());
        const itemQuantity = await pageShoppingCart.getItemQuantity(orderRow);

        expect(await itemQuantity.getText()).to.eql(packageQuantity);
    })

    it("Verify that Total price is correct calculated", async() => {
        const orderRow = await pageShoppingCart.getOrderRow(pacakgeToAdd.toUpperCase());
        
        const itemQuantity = await pageShoppingCart.getItemQuantity(orderRow);
        const pricePerItem = await pageShoppingCart.getPricePerItem(orderRow);
        const totalPrice = await pageShoppingCart.getTotalPrice(orderRow);

        const qunnty = Number(await itemQuantity.getText());
        const price = Number((await pricePerItem.getText()).replace(/\D/g, ""));
        const total = Number((await totalPrice.getText()).replace(/\D/g, ""));

        const totalPriceCalculated = qunnty * price;

        expect(totalPriceCalculated).to.eql(total);
    })

    it("Checkout purchase", async () => {
        await pageShoppingCart.getButtonCheckout().click();

        const headerCheckout = await pageCheckout.getHeaderCheckoutTitle();
        expect(await headerCheckout).to.contain("Order #");

    })

    it("Verify order history", async() => {
        const orderNumber = await pageBasepage.getCheckoutOrderNumber();
        
        await pageCheckout.clickOrderHistoryButton().click();

        const historyUrl = await pageHistory.getHistoryUrl();

        expect(await historyUrl).to.eql("http://shop.qa.rs/history");
        
        const orderRow = await pageHistory.getOrderHistoryRow(orderNumber);
        const orderStatus = await pageHistory.getOrderStatus(orderRow);

        expect(await orderStatus.getText()).to.be.eql("Ordered");

    })   

});
