var Champion = require('../models/champion');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/champions').get(getChampions);

module.exports = router;

function getChampions(req, res){
    Champion.find(function(err, champions){
        if (err) Response(res, "Error", err, 0);
        else if (champions == null) 
            Response(res, "Error : No champions found", null, 0);
        else
            Response(res, "Champions found", champions, 1);
    });
}