var async = require('async');
var calls = [];

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/patatoid');

var Champion = require('../models/Champion');
var ChampionItem = require('../models/ChampionItem');
var ChampionLane = require('../models/ChampionLane');
var ChampionPlayerRank = require('../models/ChampionPlayerRank');
var ChampionRole = require('../models/ChampionRole');
var ChampionSpell = require('../models/ChampionSpell');
var Match = require('../models/Match');
var Team = require('../models/Team');

var itemFields = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"];

function dataAnalyze(data) {
    fillChampionWithData(data);
    fillChampionItemWithData(data);
};

module.exports = dataAnalyze;

function fillChampionWithData(data) {
    async.each(data.participants,
        function addOrEditChampion(participant, callback) {
            Champion.findOne({
                    championId: participant.championId
                },
                function useResult(err, champion) {
                    if (err) console.error(err);
                    else {
                        if (champion == undefined)
                            champion = createOrFilledChampion(null,
                                participant,
                                data.teams);
                        else
                            champion = createOrFilledChampion(champion,
                                participant,
                                data.teams);
                        champion.save(function (err) {
                            console.log(champion);
                            if (err) console.error(err);
                        });
                    }
                    callback()
                });;
        },
        function (err) {
            if (err) console.error(err);
            console.error("finished");
        });
}

function createOrFilledChampion(ch, p, teams) {
    if (ch == null) {
        ch = new Champion();
        ch.championId = p.championId;
    }

    ch.played++;

    if (p.teamId == getWinTeamId(teams)) ch.wins++;

    ch.cumulatedMaxLevel += p.stats.champLevel;
    if (ch.maxLevel < p.stats.champLevel) ch.maxLevel = p.stats.champLevel;

    ch.cumulatedKills += p.stats.kills;
    if (ch.maxKills < p.stats.kills) ch.maxKills = p.stats.kills;
    ch.cumulatedDeaths += p.stats.deaths;
    if (ch.maxDeaths < p.stats.deaths) ch.maxDeaths = p.stats.deaths;
    ch.cumulatedAssists += p.stats.assists;
    if (ch.maxAssists < p.stats.assists) ch.maxAssists = p.stats.assists;

    ch.cumulatedDoubleKills += p.stats.doubleKills;
    if (ch.maxDoubleKills < p.stats.doubleKills)
        ch.maxDoubleKills = p.stats.doubleKills;
    ch.cumulatedTripleKills += p.stats.tripleKills;
    if (ch.maxTripleKills < p.stats.tripleKills)
        ch.maxTripleKills = p.stats.tripleKills;
    ch.cumulatedQuadKills += p.stats.quadKills;
    if (ch.maxQuadKills < p.stats.quadKills)
        ch.maxQuadKills = p.stats.quadKills;
    ch.cumulatedPentaKills += p.stats.pentaKills;
    if (ch.maxPentaKills < p.stats.pentaKills)
        ch.maxPentaKills = p.stats.pentaKills;
    ch.cumulatedUnrealKills += p.stats.unrealKills;
    if (ch.maxUnrealKills < p.stats.unrealKills)
        ch.maxUnrealKills = p.stats.unrealKills;
    if (ch.maxMultiKill < p.stats.largestMultiKill)
        ch.maxMultiKill = p.stats.largestMultiKill;

    if (p.stats.firstBloodKill) ch.cumulatedFirstBloodKill++;

    ch.cumulatedMinionKills += p.stats.minionsKilled;
    if (ch.maxMinionKills < p.stats.minionsKilled)
        ch.maxMinionKills = p.stats.minionsKilled;

    ch.cumulatedSightWardsBought += p.stats.sightWardsBoughtInGame;
    if (ch.maxSightWardsBought < p.stats.sightWardsBoughtInGame)
        ch.maxSightWardsBought = p.stats.sightWardsBoughtInGame;
    ch.cumulatedVisionWardsBought += p.stats.visionWardsBoughtInGame;
    if (ch.maxVisionWardsBought < p.stats.visionWardsBoughtInGame)
        ch.maxVisionWardsBought = p.stats.visionWardsBoughtInGame;

    ch.cumulatedGoldEarned += p.stats.goldEarned;
    if (ch.maxGoldEarned < p.stats.goldEarned)
        ch.maxGoldEarned = p.stats.goldEarned;
    ch.cumulatedGoldSpent += p.stats.goldSpent;
    if (ch.maxGoldSpent < p.stats.goldSpent)
        ch.maxGoldSpent = p.stats.goldSpent;

    ch.cumulatedMaxCriticalStrike += p.stats.largestCriticalStrike;
    if (ch.maxCriticalStrike < p.stats.largestCriticalStrike)
        ch.maxCriticalStrike = p.stats.largestCriticalStrike;
    ch.cumulatedMaxKillingSpreee += p.stats.largestKillingSpree;
    if (ch.maxKillingSpree < p.stats.largestKillingSpree)
        ch.maxKillingSpree = p.stats.largestKillingSpree;

    ch.cumulatedMagicDamageDealt += p.stats.magicDamageDealt;
    if (ch.maxMagicDamageDealt < p.stats.magicDamageDealt)
        ch.maxMagicDamageDealt = p.stats.magicDamageDealt;
    ch.cumulatedMagicDamageDealtToChampions += p.stats.magicDamageDealtToChampions;
    if (ch.maxMagicDamageDealtToChampions < p.stats.magicDamageDealtToChampions)
        ch.maxMagicDamageDealtToChampions = p.stats.magicDamageDealtToChampions;
    ch.cumulatedMagicDamageTaken += p.stats.magicDamageTaken;
    if (ch.maxMagicDamageTaken < p.stats.magicDamageTaken)
        ch.maxMagicDamageTaken = p.stats.magicDamageTaken;

    ch.cumulatedPhysicalDamageDealt += p.stats.physicalDamageDealt;
    if (ch.maxPhysicalDamageDealt < p.stats.physicalDamageDealt)
        ch.maxPhysicalDamageDealt = p.stats.physicalDamageDealt;
    ch.cumulatedPhysicalDamageDealtToChampions += p.stats.physicalDamageDealtToChampions;
    if (ch.maxPhysicalDamageDealtToChampions < p.stats.physicalDamageDealtToChampions)
        ch.maxPhysicalDamageDealtToChampions = p.stats.physicalDamageDealtToChampions;
    ch.cumulatedPhysicalDamageTaken += p.stats.physicalDamageTaken;
    if (ch.maxPhysicalDamageTaken < p.stats.physicalDamageTaken)
        ch.maxPhysicalDamageTaken = p.stats.physicalDamageTaken;

    ch.cumulatedTotalDamageDealt += p.stats.totalDamageDealt;
    if (ch.maxTotalDamageDealt < p.stats.totalDamageDealt)
        ch.maxTotalDamageDealt = p.stats.totalDamageDealt;
    ch.cumulatedTotalDamageDealtToChampions += p.stats.totalDamageDealtToChampions;
    if (ch.maxTotalDamageDealtToChampions < p.stats.totalDamageDealtToChampions)
        ch.maxTotalDamageDealtToChampions = p.stats.totalDamageDealtToChampions;
    ch.cumulatedTotalDamageTaken += p.stats.totalDamageTaken;
    if (ch.maxTotalDamageTaken < p.stats.totalDamageTaken)
        ch.maxTotalDamageTaken = p.stats.totalDamageTaken;

    ch.cumulatedTrueDamageDealt += p.stats.trueDamageDealt;
    if (ch.maxTrueDamageDealt < p.stats.trueDamageDealt)
        ch.maxTrueDamageDealt = p.stats.trueDamageDealt;
    ch.cumulatedTrueDamageDealtToChampions += p.stats.trueDamageDealtToChampions;
    if (ch.maxTrueDamageDealtToChampions < p.stats.trueDamageDealtToChampions)
        ch.maxTrueDamageDealtToChampions = p.stats.trueDamageDealtToChampions;
    ch.cumulatedTrueDamageTaken += p.stats.trueDamageTaken;
    if (ch.maxTrueDamageTaken < p.stats.trueDamageTaken)
        ch.maxTrueDamageTaken = p.stats.trueDamageTaken;

    ch.cumulatedTotalHeal += p.stats.totalHeal;
    if (ch.maxTotalHeal < p.stats.totalHeal)
        ch.maxTotalHeal = p.stats.totalHeal;
    ch.cumulatedTimeCrowdControleDealt += p.stats.totalTimeCrowdControlDealt;
    if (ch.maxTimeCrowdControleDealt < p.stats.totalTimeCrowdControlDealt)
        ch.maxTimeCrowdControleDealt = p.stats.totalTimeCrowdControlDealt;
    ch.cumulatedUnitsHealed += p.stats.totalUnitsHealed;
    if (ch.maxUnitsHealed < p.stats.totalUnitsHealed)
        ch.maxUnitsHealed = p.stats.totalUnitsHealed;

    ch.cumulatedTowerKills += p.stats.towerKills;
    if (ch.maxTowerKills < p.stats.towerKills)
        ch.maxTowerKills = p.stats.towerKills;
    ch.cumulatedInhibitorKills += p.stats.inhibitorKills;
    if (ch.maxInhibitorKills < p.stats.inhibitorKills)
        ch.maxInhibitorKills = p.stats.inhibitorKills;

    return ch;
}

function getWinTeamId(teams) {
    if (teams[0].winner)
        return teams[0].teamId;
    else
        return teams[1].teamId;
}

function getBans(teams) {
    var res = [];

    for (var i = 0; i < teams[0].bans.length; i++) {
        res[teams[0].bans[i].pickTurn] = teams[0].bans[i].championId;
        res[teams[1].bans[i].pickTurn] = teams[1].bans[i].championId;
    }

    return res;
}

function fillChampionItemWithData(data) {
    async.each(data.participants,
        function (participant, callback) {
            async.each(itemFields,
                function (item, callback) {
                    addOrEditChampionItem(data, participant, item, callback);
                },
                function (err) {
                    if (err) console.error(err);
                });
        },
        function (err) {
            if (err) console.error(err);
        });
}

function addOrEditChampionItem(data, participant, itemField, callback) {
    ChampionItem.findOne({
            championId: participant.championId,
            itemId: participant.stats[itemField]
        },
        function useResult(err, championItem) {
            if (err) console.error(err);
            else {
                if (championItem == undefined)
                    championItem = createOrFilledChampionItem(null,
                        participant.championId,
                        participant.stats[itemField]);
                else
                    championItem = createOrFilledChampionItem(championItem,
                        participant.championId,
                        participant.stats[itemField]);
                championItem.save(function (err) {
                    console.log(championItem);
                    if (err) console.error(err);
                });
            }
            callback()
        });
}

function createOrFilledChampionItem(ci, championId, itemId){
    if (ci == null){
        ci = new ChampionItem();
        ci.championId = championId;
        ci.itemId = itemId;
    }
    
    ci.value++;
    
    return ci;
}
    

function fillChampionLaneWithData(data) {

}

function fillChampionPlayerRankWithData(data) {

}

function fillChampionRoleWithData(data) {

}

function fillChampionSpellWithData(data) {

}

function fillMatchWithData(data) {

}

function fillTeamWithData(data) {

}