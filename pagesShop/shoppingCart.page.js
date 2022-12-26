const {By, Key, until} = require("selenium-webdriver");

module.exports = class ShoppingCart {
#driver;

    constructor(driver){
    this.#driver = driver;
    }

    goToPage(url){
        return this.#driver.get(url);
        }


    getShoppingCartURL(){
        return this.#driver.getCurrentUrl();
    }

    getButtonCheckout(){
        return this.#driver.findElement(By.name("checkout"));
    }

    getShoppingCartTable(){
        return this.#driver.findElement(By.css("table"));
    }

    getOrderRow(packageName){
    const xpathRow = `//td[contains(., ${packageName})]/parent::tr`;
    return this.#driver.findElement(By.xpath(xpathRow));
    }

    getItemQuantity(orderRow){
    return orderRow.findElement(By.xpath("td[2]"));
    }

    getPricePerItem(orderRow){
        return orderRow.findElement(By.xpath("td[3]"));
        }

    getTotalPrice(orderRow){
    return orderRow.findElement(By.xpath("td[4]"));
            }

    }