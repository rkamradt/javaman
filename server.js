var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var fieldFactory = require('./client/field');
var gorouteFactory = require('./server/goroute');

var field = fieldFactory();
field.makeField();
field.moveTo(0,0);

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'dist')));
 // parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev', { format: 'dev', immediate: true }));
app.use(gorouteFactory(field));

http.createServer(app).listen(9999, function() {
 console.log('Server up: http://localhost:' + 9999);
});
