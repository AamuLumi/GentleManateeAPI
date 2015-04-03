var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ChampionSchema = new Schema({
    championId : Number,
    
    played : {type : Number, default : 0},
    
    cumulatedKills : {type : Number, default : 0},
    maxKills : {type : Number, default : 0},
    cumulatedAssists : {type : Number, default : 0},
    maxAssists : {type : Number, default : 0},
    cumulatedDeaths : {type : Number, default : 0},
    maxDeaths : {type : Number, default : 0},
    
    cumulatedDoubleKills : {type : Number, default : 0},
    maxDoubleKills : {type : Number, default : 0},
    cumulatedTripleKills : {type : Number, default : 0},
    maxTripleKills : {type : Number, default : 0},
    cumulatedQuadraKills : {type : Number, default : 0},
    maxQuadraKills : {type : Number, default : 0},
    cumulatedPentaKills : {type : Number, default : 0},
    maxPentaKills : {type : Number, default : 0},
    cumulatedUnrealKills : {type : Number, default : 0},
    maxUnrealKills : {type : Number, default : 0},
    maxMultiKill : {type : Number, default : 0},
    
    cumulatedFirstBloodKill : {type : Number, default : 0},
    
    cumulatedMinionKills : {type : Number, default : 0},
    maxMinionKills : {type : Number, default : 0},
    
    cumulatedSightWardsBought : {type : Number, default : 0},
    maxSightWardsBought : {type : Number, default : 0},
    cumulatedVisionWardsBought : {type : Number, default : 0},
    maxVisionWardsBought : {type : Number, default : 0},
    
    cumulatedGoldEarned : {type : Number, default : 0},
    maxGoldEarned : {type : Number, default : 0},
    cumulatedGoldSpend : {type : Number, default : 0},
    maxGoldSpend : {type : Number, default : 0},
    
    maxCriticalStrike : {type : Number, default : 0},
    cumulatedMaxCriticalStrike : {type : Number, default : 0},
    maxKillingSpree : {type : Number, default : 0},
    cumulatedMaxKillingSpreee : {type : Number, default : 0},
    
    cumulatedMagicDamageDealt : {type : Number, default : 0},
    maxMagicDamageDealt : {type : Number, default : 0},
    cumulatedMagicDamageDealtToChampions : {type : Number, default : 0},
    maxMagicDamageDealtToChampions : {type : Number, default : 0},
    cumulatedMagicDamageTaken : {type : Number, default : 0},
    maxMagicDamageTaken : {type : Number, default : 0},
    
    cumulatedPhysicalDamageDealt : {type : Number, default : 0},
    maxPhysicalDamageDealt : {type : Number, default : 0},
    cumulatedPhysicalDamageDealtToChampions : {type : Number, default : 0},
    maxPhysicalDamageDealtToChampions : {type : Number, default : 0},
    cumulatedPhysicalDamageTaken : {type : Number, default : 0},
    maxPhysicalDamageTaken : {type : Number, default : 0},
    
    cumulatedTotalDamageDealt : {type : Number, default : 0},
    maxTotalDamageDealt : {type : Number, default : 0},
    cumulatedTotalDamageDealtToChampions : {type : Number, default : 0},
    maxTotalDamageDealtToChampions : {type : Number, default : 0},
    cumulatedTotalDamageTaken : {type : Number, default : 0},
    maxTotalDamageTaken : {type : Number, default : 0},
    
    cumulatedTrueDamageDealt : {type : Number, default : 0},
    maxTrueDamageDealt : {type : Number, default : 0},
    cumulatedTrueDamageDealtToChampions : {type : Number, default : 0},
    maxTrueDamageDealtToChampions : {type : Number, default : 0},
    cumulatedTrueDamageTaken : {type : Number, default : 0},
    maxTrueDamageTaken : {type : Number, default : 0},
    
    cumulatedTotalHeal : {type : Number, default : 0},
    maxTotalHeal : {type : Number, default : 0},
    cumulatedTimeCrowdControlDealt : {type : Number, default : 0},
    maxTimeCrowdControlDealt : {type : Number, default : 0},
    cumulatedUnitsHealed : {type : Number, default : 0},
    maxUnitsHealed : {type : Number, default : 0},
    
    cumulatedTowerKills : {type : Number, default : 0},
    maxTowerKills : {type : Number, default : 0},
    cumulatedInhibitorKills : {type : Number, default : 0},
    maxInhibitorKills : {type : Number, default : 0},
    
    banAtFirstTurn : {type : Number, default : 0},
    banAtSecondTurn : {type : Number, default : 0},
    banAtThirdTurn : {type : Number, default : 0},
    banAtFourthTurn : {type : Number, default : 0},
    banAtFifthTurn : {type : Number, default : 0},
    banAtSixthTurn : {type : Number, default : 0}
});

module.exports = mongoose.model('Champion', ChampionSchema);