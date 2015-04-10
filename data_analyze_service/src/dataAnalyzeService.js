var https = require('https');
var fs = require('fs');
var async = require('async');
var dataAnalyze = require('../../api/src/dataAnalyze');

var datasDirPath = '/../../data_hook_service/src/datas';

var apiKey = JSON.parse(fs.readFileSync('../../apiKey.json', 'utf8')).apiKey;

function getAndAnalyzeMatch(id, callback) {
    console.log("[DAS] Trying to get : " + id);
    if (apiKey == undefined) {
        console.error("Error : No API Key found");
        return;
    }

    var path = '/api/lol/euw/v2.2/match/' + id + '?includeTimeline=false&api_key=' + apiKey;

    return https.get({
        host: 'euw.api.pvp.net',
        path: path
    }, function useResponse(response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var data = JSON.parse(body);

            if ("status" in data) {
                console.error(data.status.message);
            } else {
                //console.log(data);
                console.log("[DAS] Get match : " + id);
                console.log("[DAS] Launch analyze for this match");
                dataAnalyze(data);
            }
            callback();
        });
    });
}

function readAFile() {
    var files = fs.readdirSync(datasDirPath);
    var i = 0;
    
    function nextFile(){
        var callback = readAndAnalyzeFile;
        if (callback && i < files.length) {
            callback(files[i], nextFile);
            i++;
        }
        else
            console.log("Analyze of existing files terminated");
    }
    
    nextFile();
}

function readAndAnalyzeFile(filename, superCallback) {
    var matchs = JSON.parse(fs.readFileSync(datasDirPath + "/" + filename, 'utf8'));
    var i = 0;
    
    if (matchs.length == 0){
        fs.renameSync(datasDirPath + "/" + filename, datasDirPath + "/../oldDatas/" + filename);
        superCallback();
        return;
    }

    function next() {
        var callback = getAndAnalyzeMatch;
        if (callback && i < matchs.length) {
            setTimeout(function () {
                callback(matchs[i], next);
                i++;
            }, 2000);
        } else {
            fs.renameSync(datasDirPath + "/" + filename, datasDirPath + "/../oldDatas/" + filename);
            superCallback();
        }
    };

    next();
}

readAFile();