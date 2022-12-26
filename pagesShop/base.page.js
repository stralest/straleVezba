'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class BasePage {
    #driver;

    constructor(driver) {
        this.#driver = driver;
    }

    getHeaderCheckoutTitle(){
    return this.#driver.findElement(By.css("h2")).getText();
    }

    async getCheckoutOrderNumber(){
        return (await this.getHeaderCheckoutTitle()).replace(/\D/g, "");
    }
    
}