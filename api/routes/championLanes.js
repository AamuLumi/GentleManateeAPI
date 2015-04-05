var ChampionLane = require('../models/ChampionLane');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championLanes').get(getChampionLanes);

module.exports = router;

function getChampionLanes(req, res){
    ChampionLane.find(function(err, championLanes){
        if (err) Response(res, "Error", err, 0);
        else if (championLanes == null) 
            Response(res, "Error : No championLanes found", null, 0);
        else
            Response(res, "ChampionLanes found", championLanes, 1);
    });
}