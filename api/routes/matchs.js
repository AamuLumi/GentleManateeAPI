/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>entryId</td><td>Number</td><td>1</td><td>[NOT USED] Id of matchs database</td></tr>
 * <tr><td>cumulatedDuration</td><td>Number</td><td><center>0</center></td><td>Cumulated duration of analyzed matchs</td></tr>
 * <tr><td>maxDuration</td><td>Number</td><td><center>0</center></td><td>Max duration of analyzed matchs</td></tr>
 * <tr><td>minDuration</td><td>Number</td><td><center>6000000</center></td><td>Min duration of analyzed matchs</td></tr>
 * <tr><td>played</td><td>Number</td><td><center>0</center></td><td>Number of analyzed matchs</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /matchs</td><td>{@link Matchs.getMatchs}</td></tr>
 * </table><br>
 * <h2>Constants</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Value</b></td></tr>
 * <tr><td>DefaultId</td><td>1</td></tr>
 * </table><br>
 * @namespace Matchs
 * @author Florian "Aamu Lumi" Kauder
 */

var Match = require('../models/Match');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/matchs').get(getMatchs);

module.exports = router;

/**
 * Get all matchs<br>
 * @memberof Matchs
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getMatchs(req, res){
    Match.find(function(err, matchs){
        if (err) Response(res, "Error", err, 0);
        else if (matchs == null) 
            Response(res, "Error : No matchs found", null, 0);
        else
            Response(res, "Matchs found", matchs, 1);
    });
}