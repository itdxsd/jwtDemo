"use strict";

var express = require('express');
var app = express();
const config = require("./config");
var bodyParser = require('body-parser');
var port = process.env.port || config.port;
var passport = require('passport');


app.use(passport.initialize());
// create application/x-www-form-urlencoded parser  
app.use(bodyParser.urlencoded({ extended: true }));

// create application/json parser  
app.use(bodyParser.json());


//var cryptoController = require('./controller/crypto');
var loginController = require('./controller/loginController');

//app.use("/api/jwt", cryptoController)
app.use("/api/login", loginController)

app.get('/', function (req, res) {
    res.send('Hello MBS World');
})

var server = app.listen(8989, function () {
    var datetime = new Date();
    var message = "Server running on Port:-" + port + " Started at:- " + datetime;
    console.log(message)
})

//https.createServer(options, app).listen(443);
