# GentleManatee API Documentation  

Website : [https://gentlemanatee.info](https://gentlemanatee.info)  
Repository : [https://github.com/AamuLumi/GentleManateeAPI](https://github.com/AamuLumi/GentleManateeAPI)  

## Call the API

These routes are available :  
* [/ChampionItems](http://api.gentlemanatee.info/ChampionItems.html) : Get items used by champions  
* [/ChampionLanes](http://api.gentlemanatee.info/ChampionLanes.html) : Get lanes where champions are played  
* [/ChampionPlayerRanks](http://api.gentlemanatee.info/ChampionPlayerRanks.html) : Get playerRank of players who played champions  
* [/ChampionRoles](http://api.gentlemanatee.info/ChampionRoles.html) : Get roles champions played  
* [/Champions](http://api.gentlemanatee.info/Champions.html) : Get stats on champions
* [/ChampionSpells](http://api.gentlemanatee.info/ChampionSpells.html) : Get summoners spells used by champions  
* [/Matchs](http://api.gentlemanatee.info/Matchs.html) : Get general stats on analyzed matchs  
* [/Teams](http://api.gentlemanatee.info/Teams.html) : Get general stats on blue team and red team  

## Installation

You need [NodeJS](https://nodejs.org/) and [MongoDB](https://www.mongodb.org/) to run the API.  
After these installations, go to *PROJECT_ROOT* folder, and run this command :  
> npm install  

### API

In the *PROJECT_ROOT/api* folder, run : 
> node ./api.js  

After this step, your API server is listening on [http://localhost:25010](http://localhost:25010). 

### Datas Hook and Analyze Service

These services need an [Riot Games API key](https://developer.riotgames.com/) to work.  
When you get your key, create the file *PROJECT_ROOT/apiKey.json* and fill it with the next lines (and replace "xxx" with your key) :  
>{
>    "apiKey" : "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
>}

#### DataHookService

This program get every 5 minutes the games' bucket. It save the bucket in a JSON file in *PROJECT_ROOT/data_hook_service/src/datas* folder.  
It works with the [Riot Games api-challenge-v4.1](https://developer.riotgames.com/api/methods#!/980).

#### DataAnalyzeService

This program scan all files in the *PROJECT_ROOT/data_hook_service/src/datas* folder, send a request for each game and use the result to fill the database.  
It sends a request every 2 seconds.  
After a scan, files are moved to *PROJECT_ROOT/data_hook_service/src/oldDatas* folder.  
It works with the [Riot Games match-v2.2](https://developer.riotgames.com/api/methods#!/967).

## Extend the Analysis

All datas analysis are performed in *PROJECT_ROOT*/api/src/dataAnalyze.js* file.  

#### Check if game is a mirror's match

Normally, datas are treated in parallel mode. But if there's a champion played in blue team and red team, fill database with parallel mode will create false datas cause by concurrent access of a champion.  
To avoid this, there's the *isCommonChampion(data)* function which check this case, and we use parallel mode if this function return *false*, or series mode if this function return *true*.  

#### Fill each collection with new data

There's at least two functions per collection to fill. For example, to fill the Champions collection :
1- fillChampionWithData(data, eachFunction)
2- createOrFilledChampion(champion, data_participant, teams)
The first function is the base function which check for each champion if the champion exists, and get it if true.  
Second function will just create or fill a Champion object with given datas.  

## Documentation

This documentation is generated with [JSDoc](https://github.com/jsdoc3/jsdoc) and [DocStrap](https://github.com/terryweiss/docstrap).  
To re-generate a new documentation, go to *PROJECT_ROOT* folder, and install these packages :
> npm install jsdoc

> npm install ink-docstrap  

Now, go to *PROJECT_ROOT/api/doc* folder, and run this commande : 
> jsdoc ../routes -c ./config.json -d ./out -t ../../node_modules/ink-docstrap/template -r ./README.md 7

> cp ./site.yeti.css ./out/styles/