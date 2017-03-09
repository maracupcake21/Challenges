var express         = require("express"),
    app             = express(),
    mongoose        = require('mongoose');

var url = 'mongodb://localhost/evolveChallenge';

// Create the database connection
mongoose.connect(url);

// CONNECTION EVENTS
//============================
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + url);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
//============================

// BRING  SCHEMAS & MODELS
var clusterModel = require('./Cluster')(app, mongoose);
var regionModel = require('./Region')(app, mongoose);
var performanceTestModel = require('./PerformanceTest')(app, mongoose);
var performanceTestResponseModel = require('./PerformanceTestResponse')(app, mongoose);

// Initialize controllers
var clusterCtrl = require('../controllers/Clusters');
var regionCtrl = require('../controllers/Regions');

//Insert in DB the static information
clusterCtrl.addCluster({ id: 1, idRegion: 1, name: "cluster1"});

regionCtrl.addRegion({ id: 1, name: "EUR"})
regionCtrl.addRegion({ id: 2, name: "AFR"})
regionCtrl.addRegion({ id: 3, name: "AME"})