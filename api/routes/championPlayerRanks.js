var ChampionPlayerRank = require('../models/ChampionPlayerRank');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championPlayerRanks').get(getChampionPlayerRanks);

module.exports = router;

function getChampionPlayerRanks(req, res){
    ChampionPlayerRank.find(function(err, championPlayerRanks){
        if (err) Response(res, "Error", err, 0);
        else if (championPlayerRanks == null) 
            Response(res, "Error : No championPlayerRanks found", null, 0);
        else
            Response(res, "ChampionPlayerRanks found", championPlayerRanks, 1);
    });
}