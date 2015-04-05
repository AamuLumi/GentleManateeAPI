var Team = require('../models/Team');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/teams').get(getTeams);

module.exports = router;

function getTeams(req, res){
    Team.find(function(err, teams){
        if (err) Response(res, "Error", err, 0);
        else if (teams == null) 
            Response(res, "Error : No teams found", null, 0);
        else
            Response(res, "Teams found", teams, 1);
    });
}