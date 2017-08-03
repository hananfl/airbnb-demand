var express                   = require('express');
var ReceiveListingsData       = require('../services/receiveListingsData');
var DemandAlgorithm           = require('../algorithms/demandAlgorithm');
var router                    = express.Router();
var Promise                   = require('promise');

/* GET listings. */
router.get('/', function(req, res, next) {
    console.log('GET request for listings');
    new ReceiveListingsData().run(
        req.query
    ).then(function (data) {
        res.send(new DemandAlgorithm().run(data));
    });
});

module.exports = router;