var ChampionItem = require('../models/ChampionItem');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championItems').get(getChampionItems);

module.exports = router;

function getChampionItems(req, res){
    ChampionItem.find(function(err, championItems){
        if (err) Response(res, "Error", err, 0);
        else if (championItems == null) 
            Response(res, "Error : No championItems found", null, 0);
        else
            Response(res, "ChampionItems found", championItems, 1);
    });
}