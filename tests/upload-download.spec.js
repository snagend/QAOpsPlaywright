// const ExcelJs = require("exceljs");
// import{test, expect} from "@playwright/test";

// async function writeExcelTest(searchText, replacedText, change, filePath){
 
// const workbook = new ExcelJs.Workbook();
// await workbook.xlsx.readFile(filePath);
// const worksheet = workbook.getWorksheet("Sheet1");
// const output = await readExcel(worksheet, searchText);

// const cell = worksheet.getCell(output.row, output.column + change.colChange);
// cell.value = replacedText;
// await workbook.xlsx.writeFile(filePath)

// }

// async function readExcel(worksheet, searchText){
//     let output = {row: -1, column: -1};
//     worksheet.eachRow((row, rownumber) => {
//     row.eachCell((cell, colNumber) => {
//         if(cell.value === searchText){
//             output.row = rownumber;
//             output.column = colNumber;
//         }
//     })
// })
//     return output;
// }

// writeExcelTest("Mango", 350,{rowChange: 0, colChange: 2}, "C:/Users/vns24/Documents/Automation_Learning/Playwright/exceldownloadtest.xlsx");


// test.skip("Upload download excel validation", async({page}) => {
//     const textSearch = "Mango";
//     const updateValue = "350";
//     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
//     const downloadPromise = page.waitForEvent("download");
//     await page.getByRole("button", {name: "Download"}).click();
//     const download = await downloadPromise;
//     const filePath = 'C:/Users/vns24/Downloads/download.xlsx'; // Relative path for better portability
//     await download.saveAs(filePath); // This is the key missing part—save it to disk!
//     await writeExcelTest(textSearch, updateValue,{rowChange: 0, colChange: 2}, "C:/Users/vns24/Downloads/download.xlsx");
//     await page.locator("#fileinput").setInputFiles("C:/Users/vns24/Downloads/download.xlsx");
//     const textLocator = page.getByText(textSearch)
//     const desiredRow = await page.getByRole("row").filter({has: textLocator});
//     await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
// });



//Instructor code for reference:
// test('upload download excel validation', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
//   const downloadPromise = page.waitForEvent('download');
//   await page.getByRole('button', { name: 'Download' }).click();
//   const download = await downloadPromise; // Capture the download object
//   const filePath = 'C:/Users/vns24/Downloads/download.xlsx'; // Relative path for better portability
//   await download.saveAs(filePath); // This is the key missing part—save it to disk!
 
//   // Update the Excel file
//   await writeExcelTest('Mango', 350, { row: 0, colChange: 2 }, filePath);
 
//   // Upload the updated file (no need for the click() before this)
//   await page.locator('#fileinput').setInputFiles(filePath);
 
//   // Optional: Add something like this to verify it worked
//   // await expect(page.getByText('350')).toBeVisible(); // Or whatever matches your update
// });