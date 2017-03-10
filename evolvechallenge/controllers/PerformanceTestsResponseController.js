//File: controllers/PerformanceTestResponseController.js
var mongoose = require('mongoose');
var PerformanceTestResponse  = mongoose.model('PerformanceTestResponse');

//POST - Insert a new Cluster in the DB
exports.addPerformanceTestResponse = function(req, res) {
	console.log('Adding new test response');
	console.log(req);

	var performanceTestResponse = new PerformanceTestResponse({
		idTest:    req.idTest,
		isCluster: 	  req.isCluster,
		responseTime:  req.responseTime
	});

	performanceTestResponse.save();
};