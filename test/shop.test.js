"use strict";

require("chromedriver");
const { Builder, By, Key, until, Button } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const GooglePage = require("../pages/google.page");

describe.only("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageGooglePage;

    beforeEach(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        pageHomepage = new HomePage(driver);
        pageGooglePage = new GooglePage(driver);
        await driver.manage().window().maximize();
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
        await pageGooglePage.goToPage("https://www.google.com");
        await pageGooglePage.search("selenium");
    })
});
