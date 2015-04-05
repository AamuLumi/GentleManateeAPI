var Match = require('../models/Match');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/matchs').get(getMatchs);

module.exports = router;

function getMatchs(req, res){
    Match.find(function(err, matchs){
        if (err) Response(res, "Error", err, 0);
        else if (matchs == null) 
            Response(res, "Error : No matchs found", null, 0);
        else
            Response(res, "Matchs found", matchs, 1);
    });
}