var ChampionRole = require('../models/ChampionRole');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championRoles').get(getChampionRoles);

module.exports = router;

function getChampionRoles(req, res){
    ChampionRole.find(function(err, championRoles){
        if (err) Response(res, "Error", err, 0);
        else if (championRoles == null) 
            Response(res, "Error : No championRoles found", null, 0);
        else
            Response(res, "ChampionRoles found", championRoles, 1);
    });
}