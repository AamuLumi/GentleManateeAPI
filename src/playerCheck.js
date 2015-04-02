var PlayerCheck = function () {

};

var getBestPlayersForStat = function (participants, statField) {
    var best = {
        participantId: -1,
        score: -1
    };
    
    var bestArray = [best];

    for (var i = 0; i < participants.length; i++) {
        if (participants[i].stats[statField] > bestArray[0].score) {
            bestArray = []
            bestArray.push({participantId : participants[i].participantId,
                            score : participants[i].stats[statField]});
        }
        else if (participants[i].stats[statField] >= bestArray[0].score){
            bestArray.push({participantId : participants[i].participantId,
                            score : participants[i].stats[statField]});   
        }
    }

    return bestArray;
}

var getWorstPlayerForStat = function (participants, statField) {
    var worst = {
        participantId: -1,
        score: Number.MAX_VALUE
    };

    for (var i = 0; i < participants.length; i++) {
        if (participants[i].stats[statField]  < worst.score) {
            worst.participantId = participants[i].participantId;
            worst.score = participants[i].stats[statField] ;
        }
    }

    return worst;
}

module.exports = PlayerCheck;
module.exports.getBestPlayersForStat = getBestPlayersForStat;
module.exports.getWorstPlayerForStat = getWorstPlayerForStat;