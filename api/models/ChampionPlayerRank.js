var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionPlayerRankSchema = new Schema({
    championId : Number,
    playerRankId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionPlayerRank', ChampionPlayerRankSchema);
module.exports.PlayerRank = {};
module.exports.PlayerRank.Unranked = 0;
module.exports.PlayerRank.Bronze = 1;
module.exports.PlayerRank.Silver = 2;
module.exports.PlayerRank.Gold = 3;
module.exports.PlayerRank.Platinum = 4;
module.exports.PlayerRank.Diamond = 5;
module.exports.PlayerRank.Master = 6;
module.exports.PlayerRank.Challenger = 7;