var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionPlayerRankSchema = new Schema({
    championId : Number,
    playerRankId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionPlayerRank', ChampionPlayerRankSchema);
module.exports.Unranked = 0;
module.exports.Bronze = 1;
module.exports.Silver = 2;
module.exports.Gold = 3;
module.exports.Platinum = 4;
module.exports.Diamond = 5;
module.exports.Master = 6;
module.exports.Challenger = 7;