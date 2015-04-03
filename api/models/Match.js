var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var MatchSchema = new Schema({
    cumulatedDuration : {type : Number, default : 0},
    maxDuration : {type : Number, default : 0},
    minDuration : {type : Number, default : 0},
    
    played : {type : Number, default : 0},
});

module.exports = mongoose.model('Match', MatchSchema);