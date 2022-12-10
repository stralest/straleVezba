const {By, Key, until} = require("selenium-webdriver");

module.exports = class GooglePage {
#driver;

    constructor(driver){
    this.#driver = driver;
    }

    async goToPage(){
    await this.#driver.get("https://www.google.com/");
    }

    async search(){
        await this.#driver.findElement(By.name("q")).sendKeys("selenium", Key.ENTER);
    }
}