var express = require('express');
var path = require('path');
var jsdom = require("jsdom");
var $ = require('jquery');
var app = express();

var index = require('./routes/index');
var listings = require('./routes/listings');

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
// app.set('services', path.join(__dirname, 'services'));
// app.set('utils', path.join(__dirname, 'utils'));

app.use('/', index);
app.use('/listings', listings);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});