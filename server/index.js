const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const game = require('./game');
const WebSocketServer = require('ws').Server;
const url = require('url');
const wss = new WebSocketServer( {
  port: 40510
} );

// Setup
////////////////////////////////////////////////////////////////////////

const app = express();
app.on('SIGUSR2', () => { process.exit(0); });  // nodemon fix

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define port to run server on
var port = process.env.APPLICATION_PORT || 8080 ;

app.use( express.static( '.' ) );
app.set( 'view engine', 'html' ) ;

// Game Api
////////////////////////////////////////////////////////////////////////

// /g/:channel
wss.on('connection', (ws, req) => { 
  const query = url.parse(req.url, true).query;
  game.init(query.channel, ws);
});

app.use( '*', function(req, res) {
  res.sendFile(path.resolve('index.html'));
} );

// Start Server
////////////////////////////////////////////////////////////////////////

app.listen( port, '0.0.0.0' ) ;
console.log( 'Listening on port %s...', port ) ;
