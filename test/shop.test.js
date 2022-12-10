"use strict";

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const GooglePage = require("../pages/google.page");

describe.only("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageGooglePage;

    before(function() {
        driver = new webdriver.Builder().forBrowser("chrome").build();
        pageHomepage = new HomePage(driver);
        pageGooglePage = new GooglePage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    beforeEach(function() {
        // Pokrece se pre svakog testa
    });

    afterEach(function() {
        // Pokrece se nakon svakog testa
    });

    it("Verify homepage is open", async function() {
        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("(QA) Shop");
        expect(await pageHomepage.isBugListDivDisplayed()).to.be.true;
    });

    it("google test", async()=> {
        pageGooglePage.goToPage();
        pageGooglePage.search();
    })

});
