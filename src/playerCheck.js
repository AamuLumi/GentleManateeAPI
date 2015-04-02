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

module.exports = PlayerCheck;
module.exports.getBestPlayersForStat = getBestPlayersForStat;
module.exports.getWorstPlayersForStat = getWorstPlayersForStat;