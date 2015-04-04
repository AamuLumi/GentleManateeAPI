var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var MatchSchema = new Schema({
    entryId : {type : Number, default : 1},
    
    cumulatedDuration : {type : Number, default : 0},
    maxDuration : {type : Number, default : 0},
    minDuration : {type : Number, default : 6000000},
    
    played : {type : Number, default : 0},
});

module.exports = mongoose.model('Match', MatchSchema);
module.exports.DefaultId = 1;