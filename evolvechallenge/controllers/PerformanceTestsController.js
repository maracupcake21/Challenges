//File: controllers/PerformanceTestsController.js
var mongoose = require('mongoose');
var PerformanceTest  = mongoose.model('PerformanceTest');
var PerformanceTestResponse  = mongoose.model('PerformanceTestResponse');
var Counter  = mongoose.model('Counter');
var tcpp = require('tcp-ping');

//require('../Server/ping');

//POST - Insert a new Cluster in the DB
exports.addPerformanceTest = function(req, res) {
	console.log('Adding new test');
	console.log(req.body);

	/*var counter = new Counter({
		_id:    "performanceTest",
		seq: 	  0
	});

	counter.save(function(err, counter) {
		if(err) return res.send(500, err.message);
	});*/

	var performanceTest = new PerformanceTest({
			id:    1,
			host: 	  req.body.host,
			requestNumber:  req.body.requestNumber
		});

		performanceTest.save(function(err, performanceTest) {
			if(err) return res.send(500, err.message);
			
			tcpp.probe(req.body.host, 80, function(err, available) {
				console.log("host available: " + available);
			});
			
			var response = []; 
			tcpp.ping({ address: req.body.host , attempts: performanceTest.requestNumber}, function(err, data) {
				var results = data.results;
				var clusterid = 1;

				console.log(data);
				for(var index in results)
				{
					var performanceTestResponse = new PerformanceTestResponse({
						idTest:    performanceTest.id,
						isCluster: 	  clusterid,
						responseTime:  results[index].time
					});
					performanceTestResponse.save(function(err, performanceTestResponse) {
						if(err) return res.send(500, err.message);
					});

					response.push(performanceTestResponse); 

					clusterid++;
				}

				res.status(200).jsonp(response);
			});
		});
};

/*function getNextSequence(name) {
   var db = mongoose.connection;
   var ret = db.counter.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}*/