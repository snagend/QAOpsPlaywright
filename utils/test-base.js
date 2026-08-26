const base = require('@playwright/test');
 
exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            "usrName" : "vns77@vns.com",
            "passwd" : "Test@12345",
            "productName" : "ZARA COAT 3"
        }
    }
)