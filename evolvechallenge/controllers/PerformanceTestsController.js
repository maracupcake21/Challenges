//File: controllers/PerformanceTestsController.js
var mongoose = require('mongoose');
var PerformanceTest  = mongoose.model('PerformanceTest');

//POST - Insert a new Cluster in the DB
exports.addPerformanceTest = function(req, res) {
	console.log('Adding new test');
	console.log(req);

	var performanceTest = new PerformanceTest({
		id:    req.id,
		host: 	  req.host,
		requestNumber:  req.requestNumber
	});

	performanceTest.save();
};