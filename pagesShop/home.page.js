'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class HomePage {
    #driver;

    constructor(driver) {
        this.#driver = driver;
    }

    goToPage() {
        this.#driver.get("http://shop.qa.rs/");
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css('h1')).getText();
    }

    isBugListDivDisplayed() {
        return this.#driver.findElement(
            By.xpath(
                '//*[@class="row" and contains(., "ORDER YOUR BUGS TODAY")]'
            )
        ).isDisplayed();
    }

    getRegisterLink(){
    return this.#driver.findElement(By.xpath("//a[@href='/register']")).click();
    }

    getRegisterURL(){
        return this.#driver.getCurrentUrl();
    }

    getSignInLink(){
        return this.#driver.findElement(By.linkText("Sign in")).click();
    }

    isLogoutButtonDisplayed(){
        return this.#driver.findElement(By.xpath("//a[@href='/logout']"));
    }

    isLoginMessageDisplayed(){
        return this.#driver.findElement(By.css("h2"));
    }
    
    ClickStarterPackQuantity(){
        return this.#driver.findElement(By.xpath("(//select[@name='quantity'])[1]")).click();
    }

    ClickOption2StarterPack(){
        return this.#driver.findElement(By.xpath(("(//option[@value='2'])[1]"))).click();
    }

    ClickOrderNowButtonStarterPack(){
        return this.#driver.findElement(By.xpath("(//input[@class='btn btn-primary'])[1]")).click();
    }

    getPackageDiv(title){
    const packageXpath = `//h3[contains(text(), "${title}")]/ancestor::div[contains(@class, "panel")]`;
    return this.#driver.findElement(By.xpath(packageXpath));
    }

    getQuantityDropdown(packageDiv){
    return packageDiv.findElement(By.name("quantity"));
    }

    getOptions(quantityDropdown){
    return quantityDropdown.findElements(By.css("option"));
    }

    getOrderButton(packageDiv){
    return packageDiv.findElement(By.className("btn btn-primary"));
    }

    getHeader(){
        return this.#driver.findElement(By.css("h1"));
    }

    clickOnViewShoppingCartLink(){
        const shoppingCart = this.#driver.findElement(By.xpath("//a[@href='/cart']"));
        shoppingCart.click();
    }

}