/**
 * <h2>Model</h2>
 * <table>
 * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Default Value</b></td><td><b>Description</b></td></tr>
 * <tr><td>championId</td><td>Number</td><td></td><td>Id of champion</td></tr>
 * <tr><td>&nbsp;</td></tr>
 * <tr><td>played</td><td>Number</td><td><center>0</center></td><td>Champion played <i>x</i> times</td></tr>
 * <tr><td>wins</td><td>Number</td><td><center>0</center></td><td>Champion wins <i>x</i> times</td></tr>
 * <tr><td>&nbsp;</td></tr> 
 * <tr><td>cumulatedMaxLevel</td><td>Number</td><td><center>0</center></td><td>Cumulated level max of the champion</td></tr>
 * <tr><td>maxLevel</td><td>Number</td><td><center>0</center></td><td>Max level reached</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedKills</td><td>Number</td><td><center>0</center></td><td>Cumulated kills of the champion</td></tr>
 * <tr><td>maxKills</td><td>Number</td><td><center>0</center></td><td>Max kills of the champion</td></tr>
 * <tr><td>cumulatedAssists</td><td>Number</td><td><center>0</center></td><td>Cumulated assists of the champion</td></tr>
 * <tr><td>maxAssists</td><td>Number</td><td><center>0</center></td><td>Max assists of the champion</td></tr>
 * <tr><td>cumulatedDeaths</td><td>Number</td><td><center>0</center></td><td>Cumulated deaths of the champion</td></tr>
 * <tr><td>maxDeaths</td><td>Number</td><td><center>0</center></td><td>Max deaths of the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedDoubleKills</td><td>Number</td><td><center>0</center></td><td>Cumulated double kills of the champion</td></tr>
 * <tr><td>maxDoubleKills</td><td>Number</td><td><center>0</center></td><td>Max double kills of the champion</td></tr>
 * <tr><td>cumulatedTripleKills</td><td>Number</td><td><center>0</center></td><td>Cumulated triple kills of the champion</td></tr>
 * <tr><td>maxTripleKills</td><td>Number</td><td><center>0</center></td><td>Max triple kills of the champion</td></tr>
 * <tr><td>cumulatedQuadraKills</td><td>Number</td><td><center>0</center></td><td>Cumulated quadra kills of the champion</td></tr>
 * <tr><td>maxQuadraKills</td><td>Number</td><td><center>0</center></td><td>Max quadra kills of the champion</td></tr>
 * <tr><td>cumulatedPentaKills</td><td>Number</td><td><center>0</center></td><td>Cumulated penta kills of the champion</td></tr>
 * <tr><td>maxPentaKills</td><td>Number</td><td><center>0</center></td><td>Max penta kills of the champion</td></tr>
 * <tr><td>cumulatedUnrealKills</td><td>Number</td><td><center>0</center></td><td>Cumulated unreal of the champion</td></tr>
 * <tr><td>maxUnrealKills</td><td>Number</td><td><center>0</center></td><td>Max unreal kills of the champion</td></tr>
 * <tr><td>maxMultiKill</td><td>Number</td><td><center>0</center></td><td>Max simultaneous kills of the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedFirstBloodKill</td><td>Number</td><td><center>0</center></td><td>Cumulated firstBlood of the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedMinionKills</td><td>Number</td><td><center>0</center></td><td>Cumulated minions killed by the champion</td></tr>
 * <tr><td>maxMinionKills</td><td>Number</td><td><center>0</center></td><td>Max minions killed by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedSightWardsBought</td><td>Number</td><td><center>0</center></td><td>Cumulated sight wards bought by the champion</td></tr>
 * <tr><td>maxSightWardsBought</td><td>Number</td><td><center>0</center></td><td>Max sight wards bought by the champion</td></tr>
 * <tr><td>cumulatedVisionWardsBought</td><td>Number</td><td><center>0</center></td><td>Cumulated vision wards bought by the champion</td></tr>
 * <tr><td>maxVisionWardsBought</td><td>Number</td><td><center>0</center></td><td>Max vision wards bought by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>  
 * <tr><td>cumulatedGoldEarned</td><td>Number</td><td><center>0</center></td><td>Cumulated gold earned by the champion</td></tr>
 * <tr><td>maxGoldEarned</td><td>Number</td><td><center>0</center></td><td>Max gold earned by the champion</td></tr>
 * <tr><td>cumulatedGoldSpent</td><td>Number</td><td><center>0</center></td><td>Cumulated gold spent by the champion</td></tr>
 * <tr><td>maxGoldSpent</td><td>Number</td><td><center>0</center></td><td>Max gold spent by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>maxCriticalStrike</td><td>Number</td><td><center>0</center></td><td>Max critical strike dealt by the champion</td></tr>
 * <tr><td>cumulatedMaxCriticalStrike</td><td>Number</td><td><center>0</center></td><td>Cumulated largest critical strike of the champion</td></tr>
 * <tr><td>maxKillingSpree</td><td>Number</td><td><center>0</center></td><td>Max killing spree of the champion</td></tr>
 * <tr><td>cumulatedMaxKillingSpreee</td><td>Number</td><td><center>0</center></td><td>Cumulated killing sprees of the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedMagicDamageDealt</td><td>Number</td><td><center>0</center></td><td>Cumulated magic damage dealt by the champion</td></tr>
 * <tr><td>maxMagicDamageDealt</td><td>Number</td><td><center>0</center></td><td>Max magic damage dealt by the champion</td></tr>
 * <tr><td>cumulatedMagicDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Cumulated magic damage dealt to champions by the champion</td></tr>
 * <tr><td>maxMagicDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Max magic damage dealt to champions by the champion</td></tr>
 * <tr><td>cumulatedMagicDamageTaken</td><td>Number</td><td><center>0</center></td><td>Cumulated magic damage taken by the champion</td></tr>
 * <tr><td>maxMagicDamageTaken</td><td>Number</td><td><center>0</center></td><td>Max magic damage taken by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedPhysicalDamageDealt</td><td>Number</td><td><center>0</center></td><td>Cumulated physical damage dealt by the champion</td></tr>
 * <tr><td>maxPhysicalDamageDealt</td><td>Number</td><td><center>0</center></td><td>Max physical damage dealt by the champion</td></tr>
 * <tr><td>cumulatedPhysicalDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Cumulated physical damage dealt to champions by the champion</td></tr>
 * <tr><td>maxPhysicalDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Max physical damage dealt to champions by the champion</td></tr>
 * <tr><td>cumulatedPhysicalDamageTaken</td><td>Number</td><td><center>0</center></td><td>Cumulated physical damage taken by the champion</td></tr>
 * <tr><td>maxPhysicalDamageTaken</td><td>Number</td><td><center>0</center></td><td>Max physical damage taken by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedTotalDamageDealt</td><td>Number</td><td><center>0</center></td><td>Cumulated total damage dealt by the champion</td></tr>
 * <tr><td>maxTotalDamageDealt</td><td>Number</td><td><center>0</center></td><td>Max total damage dealt by the champion</td></tr>
 * <tr><td>cumulatedTotalDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Cumulated total damage dealt to champions by the champion</td></tr>
 * <tr><td>maxTotalDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Max total damage dealt to champions by the champion</td></tr>
 * <tr><td>cumulatedTotalDamageTaken</td><td>Number</td><td><center>0</center></td><td>Cumulated total damage dealt taken by the champion</td></tr>
 * <tr><td>maxTotalDamageTaken</td><td>Number</td><td><center>0</center></td><td>Max total damage taken by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedTrueDamageDealt</td><td>Number</td><td><center>0</center></td><td>Cumulated true damage dealt by the champion</td></tr>
 * <tr><td>maxTrueDamageDealt</td><td>Number</td><td><center>0</center></td><td>Max true damage dealt by the champion</td></tr>
 * <tr><td>cumulatedTrueDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Cumulated true damage dealt to champions by the champion</td></tr>
 * <tr><td>maxTrueDamageDealtToChampions</td><td>Number</td><td><center>0</center></td><td>Max true damage dealt to champions by the champion</td></tr>
 * <tr><td>cumulatedTrueDamageTaken</td><td>Number</td><td><center>0</center></td><td>Cumulated true damage taken by the champion</td></tr>
 * <tr><td>maxTrueDamageTaken</td><td>Number</td><td><center>0</center></td><td>Max true damage taken by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedTotalHeal</td><td>Number</td><td><center>0</center></td><td>Cumulated total heal of the champion</td></tr>
 * <tr><td>maxTotalHeal</td><td>Number</td><td><center>0</center></td><td>Max total heal of the champion</td></tr>
 * <tr><td>cumulatedTimeCrowdControlDealt</td><td>Number</td><td><center>0</center></td><td>Cumulated time of crowd control dealt to champions by the champion</td></tr>
 * <tr><td>maxTimeCrowdControlDealt</td><td>Number</td><td><center>0</center></td><td>Max time crowd control dealt by the champion</td></tr>
 * <tr><td>cumulatedUnitsHealed</td><td>Number</td><td><center>0</center></td><td>Cumulated units healed by the champion</td></tr>
 * <tr><td>maxUnitsHealed</td><td>Number</td><td><center>0</center></td><td>Max units healed by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>cumulatedTowerKills</td><td>Number</td><td><center>0</center></td><td>Cumulated towers killed by the champion</td></tr>
 * <tr><td>maxTowerKills</td><td>Number</td><td><center>0</center></td><td>Max towers killed by the champion</td></tr>
 * <tr><td>cumulatedInhibitorKills</td><td>Number</td><td><center>0</center></td><td>Cumulated inhibitors killed by the champion</td></tr>
 * <tr><td>maxInhibitorKills</td><td>Number</td><td><center>0</center></td><td>Max inhibitors killed by the champion</td></tr>
 * <tr><td>&nbsp;</td></tr>   
 * <tr><td>banAtFirstTurn</td><td>Number</td><td><center>0</center></td><td>Champion banned <i>x</i> times at first turn of bans</td></tr>
 * <tr><td>banAtSecondTurn</td><td>Number</td><td><center>0</center></td><td>Champion banned <i>x</i> times at second turn of bans</td></tr>
 * <tr><td>banAtThirdTurn</td><td>Number</td><td><center>0</center></td><td>Champion banned <i>x</i> times at third turn of bans</td></tr>
 * <tr><td>banAtFourthTurn</td><td>Number</td><td><center>0</center></td><td>Champion banned <i>x</i> times at fourth turn of bans</td></tr>
 * <tr><td>banAtFifthTurn</td><td>Number</td><td><center>0</center></td><td>Champion banned <i>x</i> times at fifth turn of bans</td></tr>
 * <tr><td>banAtSixthTurn</td><td>Number</td><td><center>0</center></td><td>Champion banned <i>x</i> times at sixth turn of bans</td></tr>
 * </table><br>
 * <h2>Routing Table</h2>
 * <table>
 * <tr><td>GET /champions</td><td>{@link Champions.getChampions}</td></tr>
 * </table><br>
 * @namespace Champions
 * @author Florian "Aamu Lumi" Kauder
 */

var Champion = require('../models/Champion');
var Response = require('../src/response');

var express = require('express');

var router = express.Router();

router.route('/champions').get(getChampions);

module.exports = router;

/**
 * Get all champions stats<br>
 * @memberof Champions
 * @param {Express.Request} req - request send
 * @param {Express.Response} res - variable to send the response
 */
function getChampions(req, res){
    Champion.find(function(err, champions){
        if (err) Response(res, "Error", err, 0);
        else if (champions == null) 
            Response(res, "Error : No champions found", null, 0);
        else
            Response(res, "Champions found", champions, 1);
    });
}