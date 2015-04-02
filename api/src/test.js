var PlayerCheck = require('./playerCheck');

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

console.log(PlayerCheck.getBestKiller(data));