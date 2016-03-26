var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname + '/public'));
require("./public/assignment/server/app.js")(app);
require("./public/Project/server/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.get('/sayHello', rootRequest);

app.listen(port, ipaddress);
function rootRequest(req, res){
    //res.send('hello world');
}
