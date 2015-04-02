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
        console.log(bests);
    });

    it('must find the worst killer', function () {
        var worsts = PlayerCheck.getWorstPlayersForStat(data.participants, "kills");
        expect(worsts[0].participantId).to.not.equal(-1);
        expect(worsts[0].score).to.not.equal(-1);
        console.log(worsts);
    });
});