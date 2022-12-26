const { By, Key, until } = require("selenium-webdriver");

module.exports = class BasePage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
        return this.#driver.get(url);
    }

    getCurrentUrl(){
        return this.#driver.getCurrentUrl();
    }

    getMainHeader(){
        return this.#driver.findElement(By.className('main-header'));
    }
    
    waitUntilMainHeaderIsLocated(){
        return this.#driver.wait(until.elementLocated(By.className('main-header')));
    }

    waitUntilAlertIsPresent(){
        return this.#driver.wait(until.alertIsPresent());
    }

    switchToAlert(){
        return this.#driver.switchTo().alert();
    }

}