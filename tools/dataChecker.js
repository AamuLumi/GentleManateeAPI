var fs = require('fs');

var dataFolder = __dirname + "/../data_hook_service/src/datas";
var files = fs.readdirSync(dataFolder);

for (var i =0; i < files.length; i++){
    var fileParsed = JSON.parse(fs.readFileSync(dataFolder + "/" + files[i]));
    
    if (fileParsed[0] == null){
        fs.renameSync(dataFolder + '/' + files[i],
                       dataFolder + '/../oldDatas/' + files[i]);
    }
    
}