/*
 * Copyright 2015 randalkamradt.
 *
 */
import express from 'express';
import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import morgan from 'morgan';
import expressSession from 'express-session';
import worldRouteFactory from './server/goroute.mjs';
import logonRouteFactory from './server/logonroute.mjs';

const app = express();
const __dirname = path.dirname(new url.URL(import.meta.url).pathname);
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.set('port', process.env.PORT || 9999);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));

 // parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev', { format: 'dev', immediate: true }));
app.use(expressSession({
  secret:'topsecret',
  saveUninitialized: true,
  resave: true
}));

app.use(worldRouteFactory());
app.use(logonRouteFactory());

http.createServer(app).listen(app.get('port'), function(err) {
 if(err) {
   console.log('unable to start javaman on port ' + app.get('port'));
   return;
 }
 console.log('Server up: http://localhost:' + app.get('port'));
});
