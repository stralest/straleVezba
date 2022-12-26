'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class CheckoutPage extends BasePage{
    #driver;

    constructor(driver) {
        super(driver);
        this.#driver = driver;
    }
 
    clickOrderHistoryButton(){
        return this.#driver.findElement(By.xpath("//a[@href='/history']"));
    }

}