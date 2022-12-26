const { By, Key, until } = require("selenium-webdriver");

module.exports = class RadioPage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
    return this.#driver.get(url);
    }

    getYesRadioButton(){
        return this.#driver.findElement(By.xpath("//label[@for='yesRadio']"));
    }

    getImpressiveRadioButton(){
        return this.#driver.findElement(By.xpath("//label[@for='impressiveRadio']"));
    }

    getNoRadioButton(){
        return this.#driver.findElement(By.xpath("//label[@for='noRadio']"));
    }

    getResultTextMessage(){
     return this.#driver.findElement(By.className("text-success")).getText();
    }

    waitUntilResultTextIsLocated(){
    return this.#driver.wait(until.elementLocated(By.className("text-success")));
    }
}