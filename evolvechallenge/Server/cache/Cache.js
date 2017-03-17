var constants = require('../../helpers/const')
const redis = require('redis')
const client = redis.createClient(constants.redisPort, constants.redisHost, {auth_pass: constants.redisAuthPassTwo, tls: {servername: constants.redisHost}}) 

//Incase any error pops up, log it
client.on("error", function(err) {
  console.log("Error " + err);
})

client.on('connect', function() {
    console.log('Connected to Cache');
});

module.exports = client 