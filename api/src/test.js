var dataAnalyze = require('./dataAnalyze');

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('../data2.json', 'utf8'));

dataAnalyze(data);