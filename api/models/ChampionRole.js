var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionRoleSchema = new Schema({
    championId : Number,
    roleId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionRole', ChampionRoleSchema);
module.exports.Role = {};
module.exports.Role.Duo = 1;
module.exports.Role.None = 2;
module.exports.Role.Solo = 3;
module.exports.Role.DuoCarry = 4;
module.exports.Role.DuoSupport = 5;