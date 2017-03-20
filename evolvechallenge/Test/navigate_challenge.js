var webdriver = require('selenium-webdriver');
 
var driver = new webdriver.Builder()
.forBrowser('firefox')
.build();
var url='http://localhost:3333';
driver.get(url);

driver.findElement(webdriver.By.id('hostinput')).sendKeys('travelport.com');
driver.findElement(webdriver.By.id('requestnumberinput')).sendKeys('20');
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
	console.log("Response times for the Performance Challenge:")	
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('legendName0')).getText().then(function(label) {
 			  	     console.log("Bar: "+label);
					 return label;
 				});
				 	
			}, 5000);
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('barValue0')).getText().then(function(bar) {
 			  	if(bar !=='0'){	console.log("Response: "+bar);}
					 return bar !== '0';
 				});
				 	
			}, 5000);
	    		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('legendName1')).getText().then(function(label) {
 			  	     console.log("Bar: "+label);
					 return label;
 				});
				 	
			}, 5000);
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
				 	
			}, 5000);
		driver.wait(function() {
 				return driver.findElement(webdriver.By.id('barValue2')).getText().then(function(bar) {
 			  	 if(bar !=='0'){
						
						   
							console.log("Response: "+bar);
						}
					 return bar !== '0';
 				});
				 	
		}, 5000);


driver.quit();