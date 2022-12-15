const {By, Key, until} = require("selenium-webdriver");

module.exports = class ShoppingCart {
#driver;

    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
        return this.#driver.get(url);
        }


    getShoppingCartURL(){
        return this.#driver.getCurrentUrl();
    }
    }