 import{test as baseTest} from "@playwright/test"

 interface TestDataForOrder{
    usrName: string;
    passwd: string;
    productName: string;
 }

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder: {
            "usrName" : "vns77@vns.com",
            "passwd" : "Test@12345",
            "productName" : "ZARA COAT 3"
        }
    }
)