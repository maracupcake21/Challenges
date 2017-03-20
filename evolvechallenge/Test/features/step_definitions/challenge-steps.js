
var webdriver = require('selenium-webdriver');

var challenge = function() {
  var driver = new webdriver.Builder()
			.forBrowser('firefox')
			.build();
	var url='http://localhost:3333';
	//var host='hostname';
   this.Given(/^I open performance test for "([^"]*)"$/, function (expectedTitle,next) {

      driver.get(url).then(next());
	  console.log("url opened: "+ url);
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
   this.When(/^I enter (.*) in host textbox$/, function (hostname,next) {	
	   
	  driver.findElement(webdriver.By.id('hostinput')).sendKeys(hostname).then(next());	
	  console.log("Hostname: "+hostname);	
	  //host=hostname;	
	});

	this.When(/^I enter (.*) as a number request$/, function (nrequest,next) {
	  driver.findElement(webdriver.By.id('requestnumberinput')).sendKeys(nrequest).then(next());	
	  console.log("Number of request: "+nrequest);		
	});

	this.Then(/^I should get response time chart$/, function (next) {
  	driver.findElement(webdriver.By.id('btnstart')).click().then(next());	
	

	});
	this.Then(/^I verify the response times$/, function (next) {

			
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('legendName0')).getText().then(function(label) {
 			  	     console.log("Bar: "+label);
					 return label;
 				});
				 	
			}, 10000);
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('barValue0')).getText().then(function(bar) {
 			  	if(bar !=='0'){	console.log("Response: "+bar);}
					 return bar !== '0';
 				});
				 	
			}, 15000);
	    		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('legendName1')).getText().then(function(label) {
 			  	     console.log("Bar: "+label);
					 return label;
 				});
				 	
			}, 15000);
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('barValue1')).getText().then(function(bar) {
					 if(bar !=='0'){	console.log("Response: "+bar);}
 			  	return bar !== '0';
 				});
				 
			}, 5000);
	    		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('legendName2')).getText().then(function(label) {
 			  	     console.log("Bar: "+label);
					 return label;
 				});
				 	
			}, 15000);
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('barValue2')).getText().then(function(bar) {
 			  	 if(bar !=='0'){
						
						   
							console.log("Response: "+bar);
						}
					 return bar !== '0';
 				});
				 	
		}, 5000);

		next();	
	  	
	});



	this.Then(/^Supose to (.*)$/, function (finished,next) {
		//console.log("Challenge Performance testing results: "+finished);
		if(finished ==='yes')
		{
		//	console.log('Hostname under test: '+ host);
			return;
		}
		else{
		//	console.log('Hostname under test: '+ host);
			next();}
		
	});
	
};
module.exports = challenge;
