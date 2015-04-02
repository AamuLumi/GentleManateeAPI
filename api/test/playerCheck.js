var expect = require('chai').expect,
    assert = require('chai').assert;

var PlayerCheck = require('../src/playerCheck');

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

describe('Player Check', function () {
    it('must find the best killer', function () {
        var bests = PlayerCheck.getBestPlayersForStat(data.participants, "kills");
        expect(bests[0].participantId).to.not.equal(-1);
        expect(bests[0].score).to.not.equal(-1);
    });

    it('must find the worst killer', function () {
        var worsts = PlayerCheck.getWorstPlayersForStat(data.participants, "kills");
        expect(worsts[0].participantId).to.not.equal(-1);
        expect(worsts[0].score).to.not.equal(-1);
    });
    
    it('must find the participant which get the first blood kill', function(){
        var players = PlayerCheck.getPlayersWithStatTrue(data.participants, "firstBloodKill");
        expect(players[0].participantId).to.not.equal(-1);
        expect(players.length).to.equal(1);
    });
    
    it('must find the participant which don\'t get the first blood kill', function(){
        var players = PlayerCheck.getPlayersWithStatFalse(data.participants, "firstBloodKill");
        expect(players[0].participantId).to.not.equal(-1);
        expect(players.length).to.equal(9);
    });
    
    it('must find the average kills', function(){
        var averageKills = PlayerCheck.getAverageForStat(data.participants, "kills");
        expect(averageKills).to.not.equal(-1);
    });
    
});