var webdriver = require('selenium-webdriver');
 
var driver = new webdriver.Builder()
   .forBrowser('firefox')
   .build();
var url='http://localhost:3333';
driver.get(url);

driver.findElement(webdriver.By.id('hostinput')).sendKeys('travelport.com');
driver.findElement(webdriver.By.id('rquestnumberinput')).sendKeys('20');
//console.log(driver.getCurrentUrl());
//console.log(driver.getTitle());
driver.findElement(webdriver.By.id('btnstart')).click();
driver.quit();