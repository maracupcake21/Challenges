// The Cluster model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var clusterSchema = new Schema({
    id : Number, // identifier of the cluster
    idRegion : Number, // identifier of the region
    name : String // name of the cluster
});
 
module.exports = mongoose.model('Cluster', clusterSchema);