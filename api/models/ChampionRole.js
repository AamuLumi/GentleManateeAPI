var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionRoleSchema = new Schema({
    championId : Number,
    roleId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionRole', ChampionRoleSchema);
module.exports.Duo = 1;
module.exports.None = 2;
module.exports.Solo = 3;
module.exports.DuoCarry = 4;
module.exports.DuoSupport = 5;