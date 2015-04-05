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
var spellFields = ["spell1Id", "spell2Id"];

function dataAnalyze(data) {
    var eachFunction;

    if (isCommonChampion(data))
        eachFunction = async.eachSeries;
    else
        eachFunction = async.each;

    fillChampionWithData(data, eachFunction);
    fillChampionItemWithData(data, eachFunction);
    fillChampionLaneWithData(data, eachFunction);
    fillChampionPlayerRankWithData(data, eachFunction);
    fillChampionRoleWithData(data, eachFunction);
    fillChampionSpellWithData(data, eachFunction);
    fillMatchWithData(data, eachFunction);
    fillTeamWithData(data, eachFunction);
};

module.exports = dataAnalyze;

function isCommonChampion(data) {
    for (var i = 0; i < data.participants.length; i++) {
        for (var j = data.participants.length - 1; j > i; j--) {
            if (data.participants[i].championId == data.participants[j].championId)
                return true;
        }
    }

    return false;
}

function fillChampionWithData(data, eachFunction) {
    eachFunction(data.participants,
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
                            if (err) console.error(err);
                        });
                    }
                    callback()
                });;
        },
        function (err) {
            if (err) console.error(err);
            var bans = getBans(data.teams);
            for (var indexBan = 0; indexBan < bans.length; indexBan++)
                addBan(bans[indexBan], indexBan);
        });
}

function addBan(bannedChampionId, turn) {
    Champion.findOne({
            championId: bannedChampionId
        },
        function useResult(err, champion) {
            if (err) console.error(err);
            else {
                if (champion == undefined)
                    champion = createOrFilledBannedChampion(null,
                        bannedChampionId, turn);
                else
                    champion = createOrFilledBannedChampion(champion,
                        bannedChampionId, turn);
                champion.save(function (err) {
                    if (err) console.error(err);
                });
            }
        });
}

function createOrFilledBannedChampion(ch, championId, turn) {
    if (ch == null) {
        ch = new Champion();
        ch.championId = championId;
    }

    switch (turn) {
    case 0:
        ch.banAtFirstTurn++;
        break;

    case 1:
        ch.banAtSecondTurn++;
        break;

    case 2:
        ch.banAtThirdTurn++;
        break;

    case 3:
        ch.banAtFourthTurn++;
        break;

    case 4:
        ch.banAtFifthTurn++;
        break;

    case 5:
        ch.banAtSixthTurn++;
        break;
    }

    return ch;
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
        res[teams[0].bans[i].pickTurn - 1] = teams[0].bans[i].championId;
        res[teams[1].bans[i].pickTurn - 1] = teams[1].bans[i].championId;
    }

    return res;
}

function fillChampionItemWithData(data, eachFunction) {
    eachFunction(data.participants,
        function (participant, callback) {
            eachFunction(itemFields,
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
                    if (err) console.error(err);
                });
            }
            callback()
        });
}

function createOrFilledChampionItem(ci, championId, itemId) {
    if (ci == null) {
        ci = new ChampionItem();
        ci.championId = championId;
        ci.itemId = itemId;
    }

    ci.value++;

    return ci;
}


function fillChampionLaneWithData(data, eachFunction) {
    eachFunction(data.participants,
        function (participant, callback) {
            ChampionLane.findOne({
                    championId: participant.championId,
                    laneId: getLaneIdForString(participant.timeline.lane)
                },
                function useResult(err, championLane) {
                    if (err) console.error(err);
                    else {
                        if (championLane == undefined)
                            championLane = createOrFilledChampionLane(null,
                                participant.championId,
                                getLaneIdForString(participant.timeline.lane));
                        else
                            championLane = createOrFilledChampionLane(championLane,
                                participant.championId,
                                getLaneIdForString(participant.timeline.lane));
                        championLane.save(function (err) {
                            if (err) console.error(err);
                        });
                    }
                    callback()
                });;
        },
        function (err) {
            if (err) console.error(err);
        });
}

function createOrFilledChampionLane(cl, championId, laneId) {
    if (cl == null) {
        cl = new ChampionLane();
        cl.championId = championId;
        cl.laneId = laneId;
    }

    cl.value++;

    return cl;
}

function getLaneIdForString(lane) {
    if ((lane == "MID") || (lane == "MIDDLE"))
        return ChampionLane.Mid;
    else if ((lane == "BOT") || (lane == "BOTTOM"))
        return ChampionLane.Bot;
    else if (lane == "TOP")
        return ChampionLane.Top;
    else if (lane == "JUNGLE")
        return ChampionLane.Jungle;
    else
        return undefined;
}

function fillChampionPlayerRankWithData(data, eachFunction) {
    eachFunction(data.participants,
        function (participant, callback) {
            ChampionPlayerRank.findOne({
                    championId: participant.championId,
                    playerRankId: getPlayerRankIdForString(
                        participant.highestAchievedSeasonTier)
                },
                function useResult(err, championPlayerRank) {
                    if (err) console.error(err);
                    else {
                        if (championPlayerRank == undefined)
                            championPlayerRank = createOrFilledChampionPlayerRank(null,
                                participant.championId,
                                getPlayerRankIdForString(
                                    participant.highestAchievedSeasonTier));
                        else
                            championPlayerRank = createOrFilledChampionPlayerRank(
                                championPlayerRank,
                                participant.championId,
                                getPlayerRankIdForString(
                                    participant.highestAchievedSeasonTier));
                        championPlayerRank.save(function (err) {
                            if (err) console.error(err);
                        });
                    }
                    callback()
                });;
        },
        function (err) {
            if (err) console.error(err);
        });
}

function createOrFilledChampionPlayerRank(cpr, championId, playerRankId) {
    if (cpr == null) {
        cpr = new ChampionPlayerRank();
        cpr.championId = championId;
        cpr.playerRankId = playerRankId;
    }

    cpr.value++;

    return cpr;
}

function getPlayerRankIdForString(pr) {
    if (pr == "UNRANKED")
        return ChampionPlayerRank.Unranked;
    else if (pr == "BRONZE")
        return ChampionPlayerRank.Bronze;
    else if (pr == "SILVER")
        return ChampionPlayerRank.Silver;
    else if (pr == "GOLD")
        return ChampionPlayerRank.Gold;
    else if (pr == "PLATINUM")
        return ChampionPlayerRank.Platinum;
    else if (pr == "DIAMOND")
        return ChampionPlayerRank.Diamond;
    else if (pr == "MASTER")
        return ChampionPlayerRank.Master;
    else if (pr == "CHALLENGER")
        return ChampionPlayerRank.Challenger;
    else
        return undefined;
}

function fillChampionRoleWithData(data, eachFunction) {
    eachFunction(data.participants,
        function (participant, callback) {
            ChampionRole.findOne({
                    championId: participant.championId,
                    roleId: getRoleIdForString(participant.timeline.role)
                },
                function useResult(err, championRole) {
                    if (err) console.error(err);
                    else {
                        if (championRole == undefined)
                            championRole = createOrFilledChampionRole(null,
                                participant.championId,
                                getRoleIdForString(participant.timeline.role));
                        else
                            championRole = createOrFilledChampionRole(championRole,
                                participant.championId,
                                getRoleIdForString(participant.timeline.role));
                        championRole.save(function (err) {
                            if (err) console.error(err);
                        });
                    }
                    callback()
                });;
        },
        function (err) {
            if (err) console.error(err);
        });
}

function createOrFilledChampionRole(cr, championId, roleId) {
    if (cr == null) {
        cr = new ChampionRole();
        cr.championId = championId;
        cr.roleId = roleId;
    }

    cr.value++;

    return cr;
}

function getRoleIdForString(role) {
    if (role == "NONE")
        return ChampionRole.None;
    else if (role == "SOLO")
        return ChampionRole.Solo;
    else if (role == "DUO")
        return ChampionRole.Duo;
    else if (role == "DUO_CARRY")
        return ChampionRole.DuoCarry;
    else if (role == "DUO_SUPPORT")
        return ChampionRole.DuoSupport;
    else
        return undefined;
}

function fillChampionSpellWithData(data, eachFunction) {
    eachFunction(data.participants,
        function (participant, callback) {
            eachFunction(spellFields,
                function (spell, callback) {
                    addOrEditChampionSpell(data, participant, spell, callback);
                },
                function (err) {
                    if (err) console.error(err);
                });
        },
        function (err) {
            if (err) console.error(err);
        });
}

function addOrEditChampionSpell(data, participant, spellField, callback) {
    ChampionSpell.findOne({
            championId: participant.championId,
            spellId: participant[spellField]
        },
        function useResult(err, championSpell) {
            if (err) console.error(err);
            else {
                if (championSpell == undefined)
                    championSpell = createOrFilledChampionSpell(null,
                        participant.championId,
                        participant[spellField]);
                else
                    championSpell = createOrFilledChampionSpell(championSpell,
                        participant.championId,
                        participant[spellField]);
                championSpell.save(function (err) {
                    if (err) console.error(err);
                });
            }
            callback()
        });
}

function createOrFilledChampionSpell(cs, championId, spellId) {
    if (cs == null) {
        cs = new ChampionSpell();
        cs.championId = championId;
        cs.spellId = spellId;
    }

    cs.value++;

    return cs;
}

function fillMatchWithData(data, eachFunction) {
    Match.findOne({
            entryId: Match.DefaultId
        },
        function useResult(err, match) {
            if (err) console.error(err);
            else {
                if (match == undefined)
                    match = createOrFilledMatch(null,
                        data);
                else
                    match = createOrFilledMatch(match,
                        data);
                match.save(function (err) {
                    if (err) console.error(err);
                });
            }
        });
}

function createOrFilledMatch(match, data) {
    if (match == null) {
        match = new Match();
    }

    match.cumulatedDuration += data.matchDuration;
    if (match.maxDuration < data.matchDuration) match.maxDuration = data.matchDuration;
    if (match.minDuration > data.matchDuration) match.minDuration = data.matchDuration;

    match.played++;

    return match;
}

function fillTeamWithData(data, eachFunction) {
    eachFunction(data.teams,
        function addOrEditTeam(team, callback) {
            Team.findOne({
                    teamId: team.teamId
                },
                function useResult(err, t) {
                    if (err) console.error(err);
                    else {
                        if (t == undefined)
                            t = createOrFilledTeam(null, team);
                        else
                            t = createOrFilledTeam(t, team);
                        t.save(function (err) {
                            if (err) console.error(err);
                        });
                    }
                    callback()
                });;
        },
        function (err) {
            if (err) console.error(err);
        });
}

function createOrFilledTeam(t, team) {
    if (t == null) {
        t = new Team();
        t.teamId = team.teamId;
    }

    if (team.winner) t.wins++;

    t.cumulatedBaronKills += team.baronKills;
    if (team.winner && team.firstBaron) t.winWithFirstBaron++;
    t.cumulatedDragonKills += team.dragonKills;
    if (team.winner && team.firstDragon) t.winWithFirstDragon++;
    t.cumulatedInhibitorKills += team.inhibitorKills;
    if (team.winner && team.firstInhibitor) t.winWithFirstInhibitor++;
    t.cumulatedTowerKills += team.towerKills;
    if (team.winner && team.firstTower) t.winWithFirstTower++;

    return t;
}