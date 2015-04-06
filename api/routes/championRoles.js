/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of Champion</td></tr>
 * <tr><td>roleId</td><td>Number</td><td></td><td>Id of Role</td></tr>
 * <tr><td>value</td><td>Number</td><td>0</td><td>Champion was played <i>x</i> times at this role</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /championRoles</td><td>{@link ChampionRoles.getChampionRoles}</td></tr>
 * </table><br>
 * <h2>Constants</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Value</b></td></tr>
 * <tr><td>Duo</td><td>1</td></tr>
 * <tr><td>None</td><td>2</td></tr>
 * <tr><td>Solo</td><td>3</td></tr>
 * <tr><td>DuoCarry</td><td>4</td></tr>
 * <tr><td>DuoSupport</td><td>5</td></tr>
 * </table><br>
 * @namespace ChampionRoles
 * @author Florian "Aamu Lumi" Kauder
 */

var ChampionRole = require('../models/ChampionRole');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championRoles').get(getChampionRoles);

module.exports = router;

/**
 * Get all champion roles<br>
 * @memberof ChampionRoles
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getChampionRoles(req, res){
    ChampionRole.find(function(err, championRoles){
        if (err) Response(res, "Error", err, 0);
        else if (championRoles == null) 
            Response(res, "Error : No championRoles found", null, 0);
        else
            Response(res, "ChampionRoles found", championRoles, 1);
    });
}