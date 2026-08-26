
class LoginPage{
    constructor(page){
        this.page = page;
        this.signInbutton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(usrName, passwd){
        await this.username.fill(usrName);
        await this.password.fill(passwd);
        await this.signInbutton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = {LoginPage};