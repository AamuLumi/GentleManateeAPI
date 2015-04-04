var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionLaneSchema = new Schema({
    championId : Number,
    laneId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionLane', ChampionLaneSchema);
module.exports.Mid = 1;
module.exports.Top = 2;
module.exports.Bot = 3;
module.exports.Jungle = 4;