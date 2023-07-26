const express = require("express");
const app = express();
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/hi", async (req, res) => {
    const hi=async()=>{

        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://epos.kerala.gov.in/SRC_Trans_Int.jsp');
        
        const desiredMonthValue = '7';
        const dropdownElementMonth = await driver.findElement(By.id('month'));
        await dropdownElementMonth.sendKeys(desiredMonthValue);
        
        const year = '2023';
        const dropdownElementYear = await driver.findElement(By.id('year'));
        await dropdownElementYear.sendKeys(year);
        
        const rationCardNumber = '1631039999';
        const searchText = 'Transaction Details for RC : 1631039999';
        const inputElement = await driver.findElement(By.id('src_no'));
        await inputElement.clear();
  await inputElement.sendKeys(rationCardNumber);

  await driver.executeScript('detailsED();');
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  const fullPageText = await driver.findElement(By.id('container')).getText();
console.log(fullPageText);
  
if (fullPageText.includes(searchText)) {
    console.log('Text found in the full page.');
    await driver.quit();
    res.send("text found")
  } else {
    await driver.quit();
    res.send("text not found");
        console.log('Text not found in the full page.');
}
 
  
}
hi();
  



  
});
const PORT = 3000|| process.env.port;
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
