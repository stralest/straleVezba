const { By, Key, until } = require("selenium-webdriver");

module.exports = class FramePage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }

    switchToFrame(){
        return this.#driver.wait(until.ableToSwitchToFrame(By.id("frame1")));
    }

    frameHeading(){
        return this.#driver.findElement(By.id("sampleHeading"));
    }
}
