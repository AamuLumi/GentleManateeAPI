/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of Champion</td></tr>
 * <tr><td>spellId</td><td>Number</td><td></td><td>Id of Spell</td></tr>
 * <tr><td>value</td><td>Number</td><td><center>0</center></td><td>Spell used <i>x</i> times by this champion</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /gentleManateeApi/championSpells</td><td>{@link ChampionSpells.getChampionSpells}</td></tr>
 * </table><br>
 * @namespace ChampionSpells
 * @author Florian "Aamu Lumi" Kauder
 */

var ChampionSpell = require('../models/ChampionSpell');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/gentleManateeApi/championSpells').get(getChampionSpells);

module.exports = router;

/**
 * Get all champion spells<br>
 * @memberof ChampionSpells
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getChampionSpells(req, res){
    ChampionSpell.find(function(err, championSpells){
        if (err) Response(res, "Error", err, 0);
        else if (championSpells == null) 
            Response(res, "Error : No championSpells found", null, 0);
        else
            Response(res, "ChampionSpells found", championSpells, 1);
    });
}