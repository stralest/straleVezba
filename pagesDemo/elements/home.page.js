const { By, Key, until } = require("selenium-webdriver");

module.exports = class HomePage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
    return this.#driver.get(url);
    }

    clicksOnElementsButton(){
        const elementsButton = this.#driver.findElement(By.xpath("//div[@class='card-body']/h5[contains(., 'Elements')]"));
        elementsButton.click();
    }
}