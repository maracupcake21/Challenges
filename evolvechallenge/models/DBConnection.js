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
var clusterCtrl = require('../controllers/ClustersController');
var regionCtrl = require('../controllers/RegionsController');
var performanceTestsCtrl = require('../controllers/PerformanceTestsController');
var PerformanceTestResponseCtrl = require('../controllers/PerformanceTestsResponseController');

//Insert in DB the static information
clusterCtrl.addCluster({ id: 1, idRegion: 1, name: "cluster1"});

regionCtrl.addRegion({ id: 1, name: "EUR"})
regionCtrl.addRegion({ id: 2, name: "AFR"})
regionCtrl.addRegion({ id: 3, name: "AME"})

performanceTestsCtrl.addPerformanceTest({ id: 1, host: "WWW:GOOGLE:ES", requestNumber: 20})

PerformanceTestResponseCtrl.addPerformanceTestResponse({ idTest: 1, isCluster: 1, responseTime: 20})
PerformanceTestResponseCtrl.addPerformanceTestResponse({ idTest: 1, isCluster: 2, responseTime: 30})
PerformanceTestResponseCtrl.addPerformanceTestResponse({ idTest: 1, isCluster: 3, responseTime: 10})