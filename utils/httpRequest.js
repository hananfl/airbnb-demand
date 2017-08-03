var request = require('request');
var Promise = require('promise');

module.exports = function HttpRequest() {
    var clientId = '3092nxybyb0otqw18e8nh5nty';

    this.get = function(params, callback) {
        var url               = params.url;
        var queryParams       = params.data;
        queryParams.client_id = clientId;

        return new Promise(function(resolve, reject) {
            request.get({ url: url, qs: queryParams, json: true }, function (error, response, body) {
                if ( !error && response.statusCode === 200 ) {
                    resolve(callback(body));
                } else if ( error ) {
                    reject(error);
                }
            });
        });
    };
};