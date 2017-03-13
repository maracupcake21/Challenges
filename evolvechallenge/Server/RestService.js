var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost:27017/evolveChallenge', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var performanceTest     = require('../models/PerformanceTest')(app, mongoose);
var performanceTestResponse     = require('../models/PerformanceTestResponse')(app, mongoose);
var counter     = require('../models/Counter')(app, mongoose);
var performanceTestCtrl = require('../controllers/PerformanceTestsController');

// API routes
var performanceTests = express.Router();

performanceTests.get('/', function(req, res) {
  res.send("Rest Service is available!");
});

performanceTests.route('/PerformanceTest')
  .post(performanceTestCtrl.addPerformanceTest);

app.use(performanceTests);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});