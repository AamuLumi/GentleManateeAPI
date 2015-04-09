/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>teamId</td><td>Number</td><td></td><td>Id of Team (100 or 200)</td></td>
    
 * <tr><td>wins</td><td>Number</td><td>0</td><td>Team won <i>x</i> times</td></td>
    
 * <tr><td>cumulatedBaronKills</td><td>Number</td><td>0</td><td>Cumulated barons killed by the team</td></td>
 * <tr><td>cumulatedDragonKills</td><td>Number</td><td>0</td><td>Cumulated dragons killed by the team</td></td>
 * <tr><td>cumulatedInhibitorKills</td><td>Number</td><td>0</td><td>Cumulated inhibitors killed by the team</td></td>
 * <tr><td>cumulatedTowerKills</td><td>Number</td><td>0</td><td>Cumulated towers killed by the team</td></td>
    
 * <tr><td>winWithFirstBaron</td><td>Number</td><td>0</td><td>Team won <i>x</i> times with the first baron killed</td></td>
 * <tr><td>winWithFirstDragon</td><td>Number</td><td>0</td><td>Team won <i>x</i> times with the first dragon killed</td></td>
 * <tr><td>winWithFirstInhibitor</td><td>Number</td><td>0</td><td>Team won <i>x</i> times with the first inhibitor killed</td></td>
 * <tr><td>winWithFirstTower</td><td>Number</td><td>0</td><td>Team won <i>x</i> times with the first tower killed</td></td>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /gentleManateeApi/teams</td><td>{@link Teams.getTeams}</td></tr>
 * </table><br>
 * @namespace Teams
 * @author Florian "Aamu Lumi" Kauder
 */

var Team = require('../models/Team');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/gentleManateeApi/teams').get(getTeams);

module.exports = router;

/**
 * Get all teams<br>
 * @memberof Teams
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getTeams(req, res){
    Team.find(function(err, teams){
        if (err) Response(res, "Error", err, 0);
        else if (teams == null) 
            Response(res, "Error : No teams found", null, 0);
        else
            Response(res, "Teams found", teams, 1);
    });
}