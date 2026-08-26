const { chromium } = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");

Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page); //This is called as world constructor you can use it any block of code
});

BeforeStep(function(){
    //this hook will be executed before all steps in a scenario with tag
});

AfterStep(async function({result}){

    if(result.status === Status.FAILED){
        await this.page.screenshot({path: "screenshot1.jpg"});
    }

});

After(function(){
    console.log("I am last to execute");
})