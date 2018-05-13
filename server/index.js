const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./api-router');

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

app.use( '/api', apiRouter );

// Start Server
////////////////////////////////////////////////////////////////////////

app.listen( port, '0.0.0.0' ) ;
console.log( 'Listening on port %s...', port ) ;
