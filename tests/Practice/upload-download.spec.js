// import{test, expect} from "@playwright/test";
// const ExcelJs = require("exceljs");

// const filePath = "C:/Users/vns24/Downloads/download.xlsx"

// async function writeExcelText2(searchText, updateText, change){
//     const workbook = new ExcelJs.Workbook();
//     await workbook.xlsx.readFile(filePath);
//     const worksheet = workbook.getWorksheet("Sheet1");

//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             if(cell.value === searchText){
//                 const updateCell = worksheet.getCell(rowNumber, colNumber + change.colChange);
//                 updateCell.value = updateText;
//             }
//         });
//     });
//     await workbook.xlsx.writeFile(filePath);
// };



// test.skip("Download and Upload E2E testing", async({page}) => {
//     const searchText = "Mango";
//     const updateText = "350";
//     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
//     const downloadPromise = page.waitForEvent("download");
//     await page.locator("#downloadButton").click();
//     const download = await downloadPromise;
//     await download.saveAs(filePath);
//     await writeExcelText2(searchText, updateText, {rowChange: 0, colChange: 2});
//     await page.locator("#fileinput").setInputFiles(filePath);
//     // const item = page.getByText(searchText);
//     // const rowItem = await page.getByRole("row").filter({has: item});
//     // await expect(rowItem.locator("#cell-4-undefined")).toHaveText(updateText);
//     await expect(
//     page.getByRole("row").filter({hasText: searchText}).locator("#cell-4-undefined"))
//     .toHaveText(updateText);
// })