var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionLaneSchema = new Schema({
    championId : Number,
    laneId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionLane', ChampionLaneSchema);
module.exports.Lane = {};
module.exports.Lane.Mid = 1;
module.exports.Lane.Top = 2;
module.exports.Lane.Bot = 3;
module.exports.Lane.Jungle = 4;