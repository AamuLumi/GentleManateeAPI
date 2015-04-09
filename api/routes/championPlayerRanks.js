/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of Champion</td></tr>
 * <tr><td>playerRankId</td><td>Number</td><td></td><td>Id of PlayerRank</td></tr>
 * <tr><td>value</td><td>Number</td><td><center>0</center></td><td>Champion was played <i>x</i> times at this rank</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /gentleManateeApi/championPlayerRanks</td><td>{@link ChampionPlayerRanks.getChampionPlayerRanks}</td></tr>
 * </table><br>
 * <h2>Constants</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Value</b></td></tr>
 * <tr><td>Unranked</td><td><center>0</center></td></tr>
 * <tr><td>Bronze</td><td><center>1</center></td></tr>
 * <tr><td>Silver</td><td><center>2</center></td></tr>
 * <tr><td>Gol</td><td><center>3</center></td></tr>
 * <tr><td>Platinum</td><td><center>4</center></td></tr>
 * <tr><td>Diamond</td><td><center>5</center></td></tr>
 * <tr><td>Master</td><td><center>6</center></td></tr>
 * <tr><td>Challenger</td><td><center>7</center></td></tr>
 * </table><br>
 * @namespace ChampionPlayerRanks
 * @author Florian "Aamu Lumi" Kauder
 */

var ChampionPlayerRank = require('../models/ChampionPlayerRank');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/gentleManateeApi/championPlayerRanks').get(getChampionPlayerRanks);

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