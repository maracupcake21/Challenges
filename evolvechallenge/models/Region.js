// The Region model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var regionSchema = new Schema({
    id : Number, // identifier of the region
    name : String // name of the region
});
 
module.exports = mongoose.model('Region', regionSchema);