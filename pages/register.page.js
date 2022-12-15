const {By, Key, until} = require("selenium-webdriver");

module.exports = class RegisterPage {
#driver;

    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
    return this.#driver.get(url);
    }

    isRegisterButtonDisplayed(){
    return this.#driver.findElement(By.name("register"));
    }

    getFirstnameField(firstname){
        return this.#driver.findElement(By.name("ime")).sendKeys(firstname);
    }

    getLastnameField(lastname){
        return this.#driver.findElement(By.name("prezime")).sendKeys(lastname);
    }

    getEmailField(email){
        return this.#driver.findElement(By.name("email")).sendKeys(email);
    }

    getUsernameField(username){
        return this.#driver.findElement(By.name("korisnicko")).sendKeys(username);
    }

    getPasswordField(password){
        return this.#driver.findElement(By.id("password")).sendKeys(password);
    }

    getPasswordConformationField(rePassword){
        return this.#driver.findElement(By.id("passwordAgain")).sendKeys(rePassword);
    }

    getRegisterButton(){
        return this.#driver.findElement(By.name("register")).click();
    }

    getSuccessRegistredMessage(){
        return this.#driver.findElement(By.className("alert alert-success")).getText();
    }

}