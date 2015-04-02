var https = require('https');
var fs = require('fs');

var apiKey = JSON.parse(fs.readFileSync('apiKey.json', 'utf8')).apiKey;

function getLastCorrectEpochDate(){
    var trueDate = Date.now();
    
    var result = Math.floor(trueDate / 1000);
    
    return result - result%300 - (300*1);
}

function getLastDatas(){
    if (apiKey == undefined){
        console.error("Error : No API Key found");
        return;
    }
    
    var lastGoodTime = getLastCorrectEpochDate();
    
    var path = '/api/lol/euw/v4.1/game/ids?beginDate='
        + lastGoodTime + '&api_key=' + apiKey;
    
    return https.get({
        host: 'euw.api.pvp.net',
        path: path
    }, function useResponse(response){
        var body = '';
        response.on('data', function(d){
            body += d;
        });
        response.on('end', function(){
            fs.writeFileSync(__dirname + "/datas/" + lastGoodTime + ".json", body);
            console.log("[DHS] Datas added ! Epoch Time : " + lastGoodTime);
        });
    });
}

var minutes = 5, interval = minutes * 60 * 1000;
setInterval(function(){
    getLastDatas();
}, interval);
        
        