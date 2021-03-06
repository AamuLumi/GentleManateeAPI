/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of Champion</td></tr>
 * <tr><td>itemId</td><td>Number</td><td></td><td>Id of Item</td></tr>
 * <tr><td>value</td><td>Number</td><td><center>0</center></td><td>Item bought <i>x</i> times</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /championItems</td><td>{@link ChampionItems.getChampionItems}</td></tr>
 * </table><br>
 * @namespace ChampionItems
 * @author Florian "Aamu Lumi" Kauder
 */

var ChampionItem = require('../models/ChampionItem');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/championItems').get(getChampionItems);

module.exports = router;

/**
 * Get all champion items<br>
 * @memberof ChampionItems
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getChampionItems(req, res){
    ChampionItem.find(function(err, championItems){
        if (err) Response(res, "Error", err, 0);
        else if (championItems == null) 
            Response(res, "Error : No championItems found", null, 0);
        else
            Response(res, "ChampionItems found", championItems, 1);
    });
}