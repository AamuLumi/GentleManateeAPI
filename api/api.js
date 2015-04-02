var express     = require('express');
var session     = require('express-session');
var vhost       = require('vhost');
var app         = express();
var router      = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/labeli-api');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next)
{
    res.header("Cache-Control", "no-cache");
    res.header("Access-Control-Allow-Origin", "http://localhost:9020");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(require('./routes/users'));

app.use(router);
app.listen(25002);