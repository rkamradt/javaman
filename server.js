/*
 * Copyright 2015 randalkamradt.
 *
 */
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var expressSession = require('express-session');
var gorouteFactory = require('./server/goroute');

app.set('port', process.env.PORT || 9999);

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'dist')));
 // parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev', { format: 'dev', immediate: true }));
app.use(expressSession({
  secret:'topsecret',
  saveUninitialized: true,
  resave: true
}));

app.use(gorouteFactory());

http.createServer(app).listen(app.get('port'), function() {
 console.log('Server up: http://localhost:' + app.get('port'));
});
