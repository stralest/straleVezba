const { By, Key, until } = require("selenium-webdriver");

module.exports = class ElementsPage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }

clicksOnTextBoxButton(){
    const textBoxPage = this.#driver.findElement(By.id("item-0"));
    textBoxPage.click();
}

clicksOnRadioButton(){
    const RadioPage = this.#driver.findElement(By.id("item-2"));
    RadioPage.click();
}

}