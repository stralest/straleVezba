"use strict";

require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const GooglePage = require("../pages/google.page");

describe.only("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageGooglePage;

    /*before(function() {
        
    });*/

    /*after(async function() {
        
    });*/

    beforeEach(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        pageHomepage = new HomePage(driver);
        pageGooglePage = new GooglePage(driver);
    });

    afterEach(async function() {
        await driver.quit();
    });

    it("Verify homepage is open", async function() {
        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("(QA) Shop");
        expect(await pageHomepage.isBugListDivDisplayed()).to.be.true;
    });

    it("google test", async () => {
        await pageGooglePage.goToPage();
        await pageGooglePage.search();
    })

});
