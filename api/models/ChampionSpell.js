var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionSpellSchema = new Schema({
    championId : Number,
    spellId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionSpell', ChampionSpellSchema);
