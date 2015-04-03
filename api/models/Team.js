var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var TeamSchema = new Schema({
    teamId : Number,
    
    wins : {type : Number, default : 0},
    
    cumulatedBaronKills : {type : Number, default : 0},
    cumulatedDragonKills : {type : Number, default : 0},
    cumulatedInhibitorKills : {type : Number, default : 0},
    cumulatedTowerKills : {type : Number, default : 0},
    
    winWithFirstBaron : {type : Number, default : 0},
    winWithFirstDragon : {type : Number, default : 0},
    winWithFirstInhibitor : {type : Number, default : 0},
    winWithFirstTower : {type : Number, default : 0}
});

module.exports = mongoose.model('Team', TeamSchema);
module.exports.Team = {};
module.exports.Team.Blue = 0;
module.exports.Team.Red = 1;