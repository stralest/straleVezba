'use strict';

require('chromedriver');
const {Builder, By, Key, until} = require("selenium-webdriver");
const { assert, expect } = require('chai');
const HomePage = require('../pagesDemo/elements/home.page');
const BasePage = require('../pagesDemo/base/base.page');
const ElementsPage = require('../pagesDemo/elements/elements.page');
const TextBoxPage = require('../pagesDemo/elements/textBox.page');
const RadioPage = require('../pagesDemo/elements/radio.page');
const AlertsPage = require('../pagesDemo/alerts,frames,windows/alerts.page');
const FramePage = require('../pagesDemo/alerts,frames,windows/frame.page');

describe.only("Demoqa tests", async() => {
    let driver;
    let pageHome;
    let pageBase;
    let pageElements;
    let pageTextBox;
    let pageRadio;
    let pageAlerts;
    let pageFrame;

    before(async() => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    pageHome = new HomePage(driver);
    pageBase = new BasePage(driver);
    pageElements = new ElementsPage(driver);
    pageTextBox = new TextBoxPage(driver);
    pageRadio = new RadioPage(driver);
    pageAlerts = new AlertsPage(driver);
    pageFrame = new FramePage(driver);
    })

    /*after(async() => {
        await driver.quit();
    })*/
 
    it("Verify that DemoQa page is opened", async() => {
        await pageHome.goToPage("https://demoqa.com/");
        const demoQaUrl = await pageBase.getCurrentUrl();
        expect(await demoQaUrl).to.eql("https://demoqa.com/");
    })

    it("Verify that elements page is opened", async() => {
        await pageHome.clicksOnElementsButton();
        await pageBase.waitUntilMainHeaderIsLocated();
        const mainHeader = await pageBase.getMainHeader();
        expect(await mainHeader.getText()).to.eql('Elements');
        const elementsUrl = await pageBase.getCurrentUrl();
        expect(await elementsUrl).to.eql('https://demoqa.com/elements');
    })

    it("Verify that text-box page is opened", async() => {
        await pageElements.clicksOnTextBoxButton();
        await pageBase.waitUntilMainHeaderIsLocated();
        const mainHeader = await pageBase.getMainHeader();
        expect(await mainHeader.getText()).to.eql('Text Box');
        const TextBoxUrl = await pageBase.getCurrentUrl();
        expect(await TextBoxUrl).to.eql('https://demoqa.com/text-box');
    })

    it("Fillouts form and submitting", async() => {
        const fullName = "Bob buttons";
        const email = "bob.buttons@example.loc";
        const currentAddress = "no street";
        const permanentAddress = "no street";

        await pageTextBox.getFullNameField(fullName);
        await pageTextBox.getEmalField(email);
        await pageTextBox.getCurrentAddressField(currentAddress);
        await pageTextBox.getPermanentAddressField(permanentAddress);
        await pageTextBox.getSubmitButton();

        await pageTextBox.waitUntilResultDivIsLocated();

        const resultDiv = await pageTextBox.getResultDiv();

        const resultFullName = await pageTextBox.getResultFullName(resultDiv);
        expect(await resultFullName.getText()).to.contain(fullName);

        const resultEmail = await pageTextBox.getResultEmail(resultDiv);
        expect(await resultEmail.getText()).to.contain(email);

        const resultCurrentAddress = await pageTextBox.getResultCurrentAddress(resultDiv);
        expect(await resultCurrentAddress.getText()).to.contain(currentAddress);

        const resultPermanentAddress = await pageTextBox.getResultPermanentAddress(resultDiv);
        expect(await resultPermanentAddress.getText()).to.contain(permanentAddress);
    })

    it("Verify that Radio page is opened", async() => {
        await pageElements.clicksOnRadioButton();
        await pageBase.waitUntilMainHeaderIsLocated();
        const mainHeader = await pageBase.getMainHeader();
        expect(await mainHeader.getText()).to.eql('Radio Button');
        const TextBoxUrl = await pageBase.getCurrentUrl();
        expect(await TextBoxUrl).to.eql('https://demoqa.com/radio-button');
    })

    it("Clicks on radio buttons - Yes, Impressive", async() => {
        const yesButton = await pageRadio.getYesRadioButton();
        yesButton.click();
        
        await pageRadio.waitUntilResultTextIsLocated();

        const resultYesButton = await pageRadio.getResultTextMessage();
        expect(await yesButton.getText()).to.eql(resultYesButton);

        const impressiveButton = await pageRadio.getImpressiveRadioButton();
        impressiveButton.click();
        
        const resultImpressiveButton = await pageRadio.getResultTextMessage();
        expect(await impressiveButton.getText()).to.eql(resultImpressiveButton);

        const noButton = await pageRadio.getNoRadioButton();
        expect(await noButton.isSelected()).to.be.false;

    }) 

    it("Verify that Alerts page is opened", async() => {
        await pageBase.goToPage('https://demoqa.com/alerts');
        const alertsPageUrl = await pageBase.getCurrentUrl();
        expect(await alertsPageUrl).to.be.eql('https://demoqa.com/alerts');
    })

    it("Clicks on alert button", async() => {
        await pageAlerts.clickOnAlertButton();
        await pageBase.waitUntilAlertIsPresent();
        const alert = await pageBase.switchToAlert();
        expect(await alert.getText()).to.eql("You clicked a button");
        await alert.accept();
       })

    it("Waiting for Alert to appear", async() => {
        await pageAlerts.clickOnWaitAlertButton();
        await pageBase.waitUntilAlertIsPresent();
        const alert = await pageBase.switchToAlert();
        expect(await alert.getText()).to.contain("5 seconds");
        await alert.accept();

    }) 

    it("Declining alert box", async () => {
        await pageAlerts.clickOnConfirmAlertButton();
        await pageBase.waitUntilAlertIsPresent();
        const alert = await pageBase.switchToAlert();
        expect(await alert.getText()).to.eql("Do you confirm action?");
        await alert.dismiss();
        const resultText = await pageAlerts.getResultTextField();
        expect(await resultText.getText()).to.contain("Cancel");
    })

    it("Confirming alert box", async () => {
        await pageAlerts.clickOnConfirmAlertButton();
        await pageBase.waitUntilAlertIsPresent();
        const alert = await pageBase.switchToAlert();
        expect(await alert.getText()).to.eql("Do you confirm action?");
        await alert.accept();
        const resultText = await pageAlerts.getResultTextField();
        expect(await resultText.getText()).to.contain("Ok");
    })

    it("typing into promt Alert box", async () => {
        await pageAlerts.clickOnPromtAlertButton();
        await pageBase.waitUntilAlertIsPresent();
        const alert = await pageBase.switchToAlert();
        expect(await alert.getText()).to.eql("Please enter your name");
        await alert.sendKeys("Strale carinaaa!");
        await alert.accept();
        const promtText = await pageAlerts.getPromtResultTextField();
        expect(await promtText.getText()).to.contain("You entered");
    })
 
    it("Verify that frame page is opened", async() => {
        await pageBase.goToPage("https://demoqa.com/frames");
        const frameUrl = await pageBase.getCurrentUrl();
        expect(await frameUrl).to.eql("https://demoqa.com/frames");
    })

    it("Getting text from frame", async() => {
        await pageFrame.switchToFrame();
        const frameHeading = await pageFrame.frameHeading();
        expect(await frameHeading.getText()).to.eql("This is a sample page");
    })

    it("Nested frames", async() => {
        await pageBase.goToPage("https://demoqa.com/nestedframes");
        await driver.wait(until.ableToSwitchToFrame(By.id("frame1")));
        await driver.wait(until.ableToSwitchToFrame(By.xpath('//iframe[@srcdoc="<p>Child Iframe</p>"]')));
        const nestedFrame = await driver.findElement(By.xpath("//p[contains(., 'Child Iframe')]"));
        expect(await nestedFrame.getText()).to.eql("Child Iframe");
    })


})