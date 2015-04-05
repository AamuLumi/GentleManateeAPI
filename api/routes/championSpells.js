var ChampionSpell = require('../models/ChampionSpell');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championSpells').get(getChampionSpells);

module.exports = router;

function getChampionSpells(req, res){
    ChampionSpell.find(function(err, championSpells){
        if (err) Response(res, "Error", err, 0);
        else if (championSpells == null) 
            Response(res, "Error : No championSpells found", null, 0);
        else
            Response(res, "ChampionSpells found", championSpells, 1);
    });
}