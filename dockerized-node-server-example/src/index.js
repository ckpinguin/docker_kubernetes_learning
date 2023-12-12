var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var parking = require('./parking');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('address', (process.env.HOST || 'localhost'));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/cool', function(request, response) {
    response.send(cool());
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Allow CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
// GET
router.get('/', function(req, res) {
    const msg = JSON.stringify({
        message: 'hooraaaay! welcome to our api!'
    }, null, 4);
    res.setHeader('Content-Type', 'application/json');
    res.send(msg);
});
// POST
router.post('/', function(req, res) {
    console.log('Got a POST request for the homepage');
    res.send('Hello POST');
});
// DELETE
router.delete('/del_user', function(req, res) {
    console.log('Got a DELETE request for /del_user');
    res.send('Hello DELETE');
});
// This responds a GET request for the /list_user page.
router.get('/list_user', function(req, res) {
    console.log('Got a GET request for /list_user');
    res.send('Page Listing');
});
// This responds a GET request for abcd, abxcd, ab123cd, and so on
router.get('/ab*cd', function(req, res) {
    console.log('Got a GET request for /ab*cd');
    res.send('Page Pattern Match');
});
router.put('/test', function(req, res) {
    console.log('Got a PUT request for /test');
    res.send('PUT request');
});

// This responds a GET request for the /list_user page.
router.get('/get_ticket', function(req, res) {
    console.log('Got a GET request for /get_ticket');
    const token = req.query.token;
    const space = parking.getSpace();
    const ticketNo = parking.getTicketNo();
    const ret = {
        eTicketNumber: ticketNo,
        proposedParkingspace: space
    };
    console.log('Giving it parking space: ' + space);
    res.send(ret);
});

router.get('/pay_ticket', function(req, res) {
    console.log('Got a GET request for /buy_ticket');
    const token = req.query.token;
    const time = req.query.startTime;
    const space = req.query.space;
    const answer = {};
    try {
        answer.checkedToken = parking.payTicket(space, token);
    } catch(err) {
        answer.error  = err;
    }
    res.send(answer);
});

router.get('/open_gate', function(req, res) {
    const token = req.query.token;
    console.log('Got a GET request for /open_gate with token: ' + token );
    const ret = {};
    if (parking.openGate(token)) {
        ret.gateOpen = true;
    } else {
        ret.gateOpen = false;
        ret.error = 'Gate could not be opened, please call administration: 2334-352-22334';
    }
    res.send(ret);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(app.get('port'), function(error) {
    if (error) {
        console.error(error);
    } else {
        //var host = server.address().address;
        var host = app.get('address');
        var port = app.get('port');
        console.info('==> 🌎  Express is Listening on ' + host + ':' + port + '. Visit http://' + host + ':' + port + '/ in your browser.');
    }
});
