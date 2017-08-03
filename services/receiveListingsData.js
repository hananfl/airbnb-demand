var HttpRequest = require('../utils/httpRequest');
var Promise     = require('promise');

module.exports = function ReceiveListingsData() {
    this.run = function (listingsArgs) {
        listingsArgs['_limit']  = 50;
        listingsArgs['_offset'] = 0;
        var params = {
            url:  'https://api.airbnb.com/v2/search_results?',
            data: listingsArgs
        };

        return new HttpRequest().get(params, generateListings);
    };

    function generateListings(listingsData) {
        var listingsHash  = {},
            listingsArray = listingsData.search_results,
            size          = listingsArray.length;

        for ( var i = 0; i < size; i++ ) {
            var property = listingsArray[i].listing;
            listingsHash[property.id] = {
                property: getPropertyData(property),
                price:    listingsArray[i].pricing_quote.nightly_price
            }
        }

        return listingsHash;
    }

    function getPropertyData(property) {
        return {
            latitude:  property.lat,
            longitude: property.lng,
            reviews:   property.reviews_count,
            rating:    property.star_rating
        };
    }
};