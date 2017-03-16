
var webdriver = require('selenium-webdriver');

var challenge = function() {
  var driver = new webdriver.Builder()
			.forBrowser('firefox')
			.build();
	var url='http://localhost:3333';
   this.Given(/^I open performance test for "([^"]*)"$/, function (expectedTitle,next) {
      driver.get(url).then(next());
			driver.wait(function() {
 				return driver.getTitle().then(function(title) {
					console.log('Testing: '+ title);
 			  	return title === expectedTitle;
 				});
			}, 1000);
			driver.wait(function() {
 				return driver.getCurrentUrl().then(function(site) {
					console.log('Site: '+ site);
 			  	return site;
 				});
			}, 1000);
		
		
	});
   this.When(/^I enter "([^"]*)" in host textbox$/, function (hostname,next) {	
	  driver.findElement(webdriver.By.id('hostinput')).sendKeys(hostname).then(next());			
	});

	this.When(/^I enter (\d+) as a number request$/, function (nrequest,next) {
	  driver.findElement(webdriver.By.id('rquestnumberinput')).sendKeys(nrequest).then(next());		
	});

	this.Then(/^I should get response time chart as a result$/, function () {
  	driver.findElement(webdriver.By.id('btnstart')).click();	
	  return;  
	});
	
};
module.exports = challenge;
