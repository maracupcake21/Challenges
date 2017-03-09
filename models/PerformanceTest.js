// The Performance test model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var performanceTestSchema = new Schema({
    id : Number, // identifier of the test
    host : String, // host of the test URL or IP
    requestNumber : Number // number or requests
});
 
module.exports = mongoose.model('PerformanceTest', performanceTestSchema);