//File: controllers/PerformanceTestsController.js
var mongoose = require('mongoose');
var PerformanceTest  = mongoose.model('PerformanceTest');
var PerformanceTestResponse  = mongoose.model('PerformanceTestResponse');
var Counter  = mongoose.model('Counter');
var tcpp = require('tcp-ping');
var cache = require('../cache/cache'); 

//require('../Server/ping');

//POST - Insert a new Cluster in the DB
exports.addPerformanceTest = function(req, res) {
	console.log('New test');
	//console.log(req);
	console.log(req.body);

	 cache.exists(req.body.host, function(err, reply) {
	    if (reply === 1) {
			console.log('Found in cache');
	        cache.get(req.body.host, function (err, reply) {
				var response = JSON.parse(reply);
	            console.log(response);

	            res.status(200).jsonp(response);
	        });
	    } else {
			getNextId('PerformanceTest', function(newId) {
				console.log('Get next id successfull');
				console.log('Adding new request');
				var performanceTest = new PerformanceTest({
					id:    newId,
					host: 	  req.body.host,
					requestNumber:  req.body.requestNumber
				});

				performanceTest.save(function(err, performanceTest) {
					if(err) return res.send(500, err.message);
					
					tcpp.probe(req.body.host, 80, function(err, available) {
						console.log("host available: " + available);
					});
					
					pingHost(performanceTest, function(response) {
						var result= [];
						for(var index in response)
						{
							result.push(response[index]);
						}
						
						cache.set(req.body.host,JSON.stringify(response), function(err,reply){
		                    console.log(reply);
		                })   

						res.status(200).jsonp(response);
					});
				});
			});	
		}
	});
};


function pingHost(performanceTest, callback) {
	var regions = [
		{"name" : "Asia"},
		{"name" : "Europe"},
		{"name" : "America"}
	]
	var response = []; 
	var pingsSuccessfully = 0;
	var idTest = performanceTest.id;
	var times;
	for (region = 0; region < regions.length; region++) {
		tcpp.ping({ address: performanceTest.host , attempts: performanceTest.requestNumber}, function(err, data) {
			var results = data.results;
			var region = regions[pingsSuccessfully].name;
			var averageTime = 0;
			times = 0;

			console.log(data);
			for(var index in results)
			{
				times = times + results[index].time;
			}

			averageTime = Math.trunc( times / performanceTest.requestNumber);
			var performanceTestResponse = new PerformanceTestResponse({
				idTest:    idTest,
				region: 	  region,
				responseTime:  averageTime
			});

			performanceTestResponse.save(function(err, performanceTestResponse) {
			});

			response.push({"region" : region, "averageTimeResponse" : averageTime});
			pingsSuccessfully++;
			if (pingsSuccessfully == regions.length)
			{
				callback(response);
			}
		});
	};
};

function getNextId(id, callback) {
	Counter.findOne({id: id}, function(err, foundCounter){
		if (err) { return next(err); }
		if (foundCounter == null)
		{
			var counter = new Counter({
				id:    id,
				seq: 	1
			});

			counter.save(function(err) {
				if (err) { return next(err); }
				callback(counter.seq);
			});
		}
		else
		{
			foundCounter.seq += 1;
			foundCounter.save(function(err) {
				if (err) { return next(err); }
				callback(foundCounter.seq);
			});
		}
	});
};