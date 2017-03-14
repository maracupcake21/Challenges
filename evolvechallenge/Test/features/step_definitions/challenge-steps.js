
var webdriver = require('selenium-webdriver');
var assert = require('assert');

var challenge = function() {
  var driver = new webdriver.Builder()
			.forBrowser('firefox')
			.build();
	var url='http://localhost:3333';
   this.Given(/^I open performance test page$/, function (next) {
	  driver.get(url).then(next());
		
		
		//console.log(driver.getCurrentUrl());
		//var title=driver.getTitle()
		//console.log(title)

		
	});
   this.When(/^I enter "([^"]*)" in host textbox$/, function (hostname,next) {
		console.log(hostname+" 1st WHEN END");
	  driver.findElement(webdriver.By.id('hostinput')).sendKeys(hostname).then(next());
		return;
		
	});

	this.When(/^I enter (\d+) as a number request$/, function (nrequest,next) {
		console.log(nrequest+" 2nd WHEN END");
	  driver.findElement(webdriver.By.id('rquestnumberinput')).sendKeys(nrequest).then(next());
		return;
	});

	this.Then(/^I should get response time chart as a result$/, function () {
  	driver.findElement(webdriver.By.id('btnstart')).click();	
	  
		//var expected=;
		//
  // assert.equal(driver.getTitle(),'Performance Test').then(next);
	
	  return;
	});
	
};
module.exports = challenge;
