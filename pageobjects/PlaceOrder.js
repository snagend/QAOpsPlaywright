const {test, expect} = require ("@playwright/test");

class PlaceOrder{
    constructor(page){
        this.page = page;
        this.country = page.getByPlaceholder('Select Country');
        this.countries = page.locator(".ta-results");
        this.selectCountry = this.countries.locator("button"); 
        this.userName = page.locator(".user__name [type='text']");
        this.submit = page.locator(".action__submit");
    }

    async placeOrder(expectedUserName){
        await this.country.pressSequentially("ind", { delay: 150 });
           await this.countries.waitFor();
           const optionsCount = await this.selectCountry.count();
           for (let i = 0; i < optionsCount; ++i) {
              const text = await this.selectCountry.nth(i).textContent();
              if (text === " India") {
                 await this.selectCountry.nth(i).click();
                 break;
              }
           }
         
           expect(this.userName.first()).toHaveText(expectedUserName);
           await this.submit.click();
    }
}

module.exports = {PlaceOrder};