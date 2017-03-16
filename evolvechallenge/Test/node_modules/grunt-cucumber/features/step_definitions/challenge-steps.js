var webdriver = require('selenium-webdriver');

module.exports = function() {
    this.Given(/^I open performance test page$/, function() {
        var driver = new webdriver.Builder()
			.forBrowser('firefox')
			.build();
			driver.get('http://challenge:8080/Challenges/index.html');
    });
	
	this.When(/^I enter "([^"]*)" in host textbox$/, function (hostinput) {
 
		driver.findElement(webdriver.By.id('hostinput')).sendKeys(hostinput);
		
		
	});
    this.When(/^I enter "([^"]*)" as a number request$/, function (requestnumber) {
 
		driver.findElement(webdriver.By.id('rquestnumberinput')).sendKeys(requestnumber);
		
		
	});
    this.Then(/^I should get response time chart as a result$/, function() {
        // Write code here that turns the phrase above into concrete actions
		pending;
		driver.quit();
    });
		
};

