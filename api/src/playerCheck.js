var PlayerCheck = function () {

};

var getBestPlayersForStat = function (participants, statField) {
    var best = {
        participantId: -1,
        score: -1
    };

    var bestArray = [best];

    for (var i = 0; i < participants.length; i++) {
        if (participants[i].stats[statField] >= bestArray[0].score) {
            // Reinit array if better score found
            if (participants[i].stats[statField] > bestArray[0].score)
                bestArray = [];

            bestArray.push({
                participantId: participants[i].participantId,
                score: participants[i].stats[statField]
            }); 
        }
    }

    return bestArray;
};

var getWorstPlayersForStat = function (participants, statField) {
    var worst = {
        participantId: -1,
        score: Number.MAX_VALUE
    };

    var worstArray = [worst];

    for (var i = 0; i < participants.length; i++) {
        if (participants[i].stats[statField] <= worstArray[0].score) {
            // Reinit array if better score found
            if (participants[i].stats[statField] < worstArray[0].score)
                worstArray = [];

            worstArray.push({
                participantId: participants[i].participantId,
                score: participants[i].stats[statField]
            }); 
        }
    }

    return worstArray;
};

var getPlayersWithStatTrue = function (participants, booleanStatField){
    var resultArray = [];

    for (var i = 0; i < participants.length; i++) {
        if (participants[i].stats[booleanStatField]) {
            resultArray.push({
                participantId: participants[i].participantId
            }); 
        }
    }

    return resultArray;
}

var getPlayersWithStatFalse = function (participants, booleanStatField){
    var resultArray = [];

    for (var i = 0; i < participants.length; i++) {
        if (!participants[i].stats[booleanStatField]) {
            resultArray.push({
                participantId: participants[i].participantId
            }); 
        }
    }

    return resultArray;
}

var getAverageForStat = function(participants, statField){
    var res = -1;
    
    for (var i = 0; i < participants.length; i++) {
        res += participants[i].stats[statField];
    }
    
    return res / participants.length;
}

module.exports = PlayerCheck;
module.exports.getBestPlayersForStat = getBestPlayersForStat;
module.exports.getWorstPlayersForStat = getWorstPlayersForStat;
module.exports.getPlayersWithStatTrue = getPlayersWithStatTrue;
module.exports.getPlayersWithStatFalse = getPlayersWithStatFalse;
module.exports.getAverageForStat = getAverageForStat;