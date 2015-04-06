/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of Champion</td></tr>
 * <tr><td>playerRankId</td><td>Number</td><td></td><td>Id of PlayerRank</td></tr>
 * <tr><td>value</td><td>Number</td><td>0</td><td>Champion was played <i>x</i> times at this rank</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /championPlayerRanks</td><td>{@link ChampionPlayerRanks.getChampionPlayerRanks}</td></tr>
 * </table><br>
 * <h2>Constants</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Value</b></td></tr>
 * <tr><td>Unranked</td><td>0</td></tr>
 * <tr><td>Bronze</td><td>1</td></tr>
 * <tr><td>Silver</td><td>2</td></tr>
 * <tr><td>Gol</td><td>3</td></tr>
 * <tr><td>Platinum</td><td>4</td></tr>
 * <tr><td>Diamond</td><td>5</td></tr>
 * <tr><td>Master</td><td>6</td></tr>
 * <tr><td>Challenger</td><td>7</td></tr>
 * </table><br>
 * @namespace ChampionPlayerRanks
 * @author Florian "Aamu Lumi" Kauder
 */

var ChampionPlayerRank = require('../models/ChampionPlayerRank');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championPlayerRanks').get(getChampionPlayerRanks);

module.exports = router;

/**
 * Get all champion playerRanks<br>
 * @memberof ChampionPlayerRanks
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getChampionPlayerRanks(req, res){
    ChampionPlayerRank.find(function(err, championPlayerRanks){
        if (err) Response(res, "Error", err, 0);
        else if (championPlayerRanks == null) 
            Response(res, "Error : No championPlayerRanks found", null, 0);
        else
            Response(res, "ChampionPlayerRanks found", championPlayerRanks, 1);
    });
}