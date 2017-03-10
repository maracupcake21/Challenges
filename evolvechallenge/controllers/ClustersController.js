//File: controllers/Clusters.js
var mongoose = require('mongoose');
var Cluster  = mongoose.model('Cluster');

//POST - Insert a new Cluster in the DB
exports.addCluster = function(req, res) {
	console.log('Adding new cluster');
	console.log(req);

	var cluster = new Cluster({
		id:    req.id,
		idRegion: 	  req.idRegion,
		name:  req.name
	});

	cluster.save();
};