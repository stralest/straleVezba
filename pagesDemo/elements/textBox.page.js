const { By, Key, until } = require("selenium-webdriver");

module.exports = class TextBoxPage{
 #driver;  
    
    constructor(driver){
    this.#driver = driver;
    }

getFullNameField(fullName){
    const fullNameField = this.#driver.findElement(By.id("userName"));
    fullNameField.sendKeys(fullName);
}

getEmalField(email){
    const emailField = this.#driver.findElement(By.id("userEmail"));
    emailField.sendKeys(email);
}

getCurrentAddressField(currentAddress){
    const currentAddressField = this.#driver.findElement(By.id("currentAddress"));
    currentAddressField.sendKeys(currentAddress);
}

getPermanentAddressField(permanentAddress){
    const permanentAddressField = this.#driver.findElement(By.id("permanentAddress"));
    permanentAddressField.sendKeys(permanentAddress);
}

getSubmitButton(){
    const submitButton =  this.#driver.findElement(By.id("submit"));
    submitButton.click();
}

getResultDiv(){
    return this.#driver.findElement(By.id("output"));
}

getResultFullName(resultDiv){
 return resultDiv.findElement(By.id("name"));
}

getResultEmail(resultDiv){
    return resultDiv.findElement(By.id("email"));
}

getResultCurrentAddress(resultDiv){
    return resultDiv.findElement(By.id("currentAddress"));
}

getResultPermanentAddress(resultDiv){
    return resultDiv.findElement(By.id("permanentAddress"));
}

waitUntilResultDivIsLocated(){
    return this.#driver.wait(until.elementLocated(By.id("output")));
}
}