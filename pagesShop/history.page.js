'use strict';
const { By, Key, until } = require("selenium-webdriver");


module.exports = class HistoryPage {
    #driver;

    constructor(driver) {
        this.#driver = driver;
    }

    getOrderHistoryRow(orederNumber){
        const rowXpath = `//tr[contains(., ${orederNumber})]`;
        return this.#driver.findElement(By.xpath(rowXpath));
    }

    getOrderStatus(orderRow){
     return orderRow.findElement(By.className("status"));
    }

    getHistoryUrl(){
        return this.#driver.getCurrentUrl();
    }
}