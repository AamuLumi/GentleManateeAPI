/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of Champion</td></tr>
 * <tr><td>laneId</td><td>Number</td><td></td><td>Id of Lane</td></tr>
 * <tr><td>value</td><td>Number</td><td>0</td><td>Champion was <i>x</i> times on this lane</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /championLanes</td><td>{@link ChampionLanes.getChampionLanes}</td></tr>
 * </table><br>
 * <h2>Constants</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Value</b></td></tr>
 * <tr><td>Mid</td><td>1</td></tr>
 * <tr><td>Top</td><td>2</td></tr>
 * <tr><td>Bot</td><td>3</td></tr>
 * <tr><td>Jungle</td><td>4</td></tr>
 * </table><br>
 * @namespace ChampionLanes
 * @author Florian "Aamu Lumi" Kauder
 */

var ChampionLane = require('../models/ChampionLane');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championLanes').get(getChampionLanes);

module.exports = router;

/**
 * Get all champion lanes<br>
 * @memberof ChampionLanes
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getChampionLanes(req, res){
    ChampionLane.find(function(err, championLanes){
        if (err) Response(res, "Error", err, 0);
        else if (championLanes == null) 
            Response(res, "Error : No championLanes found", null, 0);
        else
            Response(res, "ChampionLanes found", championLanes, 1);
    });
}