var webdriver = require('selenium-webdriver');
 
var driver = new webdriver.Builder()
   .forBrowser('firefox')
   .build();
var url='http://localhost:3333';
driver.get(url);

driver.findElement(webdriver.By.id('hostinput')).sendKeys('travelport.com');
driver.findElement(webdriver.By.id('rquestnumberinput')).sendKeys('20');
driver.wait(function() {
 return driver.getTitle().then(function(title) {
    console.log('Testing: '+title);
   return title === 'Evolve Challenge';
 });
}, 1000);
driver.wait(function() {
 return driver.getCurrentUrl().then(function(site) {
	console.log('Site: '+ site);
  	return site;
 });
}, 1000);

driver.findElement(webdriver.By.id('btnstart')).click();
driver.quit();