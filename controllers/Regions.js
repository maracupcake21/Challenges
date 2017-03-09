//File: controllers/Clusters.js
var mongoose = require('mongoose');
var Region  = mongoose.model('Region');

//POST - Insert a new Cluster in the DB
exports.addRegion = function(req, res) {
	console.log('Adding new cluster');
	console.log(req);

	var region = new Region({
		id:    req.id,
		name:  req.name
	});

	region.save();
};
