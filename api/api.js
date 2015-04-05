var express     = require('express');
var app         = express();
var router      = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/patatoid');

app.use(function(req, res, next)
{
    res.header("Cache-Control", "no-cache");
    res.header("Access-Control-Allow-Origin", "http://localhost:25002");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.use(require('./routes/champions'));
app.use(require('./routes/championLanes'));
app.use(require('./routes/championRoles'));
app.use(require('./routes/championItems'));
app.use(require('./routes/championSpells'));
app.use(require('./routes/championPlayerRanks'));
app.use(require('./routes/matchs'));
app.use(require('./routes/teams'));

app.use(router);

app.listen(25002);