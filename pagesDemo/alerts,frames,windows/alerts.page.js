const { By, Key, until } = require("selenium-webdriver");

module.exports = class AlertsPage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }


    async clickOnAlertButton(){
    const alertButton = await this.#driver.findElement(By.id('alertButton'));
    await alertButton.click();
    }

    async clickOnWaitAlertButton(){
        const waitAlertButton = await this.#driver.findElement(By.id('timerAlertButton'));
        await waitAlertButton.click();
    }

    async clickOnConfirmAlertButton(){
        const waitAlertButton = await this.#driver.findElement(By.id('confirmButton'));
        await waitAlertButton.click();
    }

    async clickOnPromtAlertButton(){
        const waitAlertButton = await this.#driver.findElement(By.id('promtButton'));
        await waitAlertButton.click();
    }

    getResultTextField(){
        return this.#driver.findElement(By.id("confirmResult"));
    }

    getPromtResultTextField(){
        return this.#driver.findElement(By.id('promptResult'));
    }


}