var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    constants       = require('../helpers/const'),
    cors            = require('cors');

// Connection to DB
/*mongoose.connect('mongodb://localhost:27017/evolveChallenge', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});*/
mongoose.connect(constants.databaseConnectionString, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(cors())
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

performanceTests.route(constants.serviceRestMethod)
  .post(performanceTestCtrl.addPerformanceTest);

app.use(performanceTests);

// Start server
app.listen(constants.serviceRestPort, function() {
  console.log("Node server running on http://localhost:" + constants.serviceRestPort);
});