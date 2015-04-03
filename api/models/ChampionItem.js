var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionItemSchema = new Schema({
    championId : Number,
    itemId : Number,
    value : {type : Number, default : 0}
});

module.exports = mongoose.model('ChampionItem', ChampionItemSchema);
