// The Performance test response model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var performanceTestResponseSchema = new Schema({
    idTest : Number, // identifier of the test
    isCluster : Number, // identifier of the cluster that did the test
    responseTime : Number // time of the response ms
});
 
module.exports = mongoose.model('PerformanceTestResponse', performanceTestResponseSchema);