const {By, Key, until} = require("selenium-webdriver");

module.exports = class LoginPage {
#driver;

    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
        return this.#driver.get(url);
        }

    getLoginPageURL(){
        return this.#driver.getCurrentUrl();
    }

    isLoginButtonDisplayed(){
        return this.#driver.findElement(By.name("login"));
    }

    getKorisnickoImeField(username){
        return this.#driver.findElement(By.name("username")).sendKeys(username);
    }

    getLozinkaField(password){
        return this.#driver.findElement(By.name("password")).sendKeys(password);
    }

    getUlogujSeButton(){
        return this.#driver.findElement(By.name("login")).click();
    }

}