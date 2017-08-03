var HttpRequest = require('../utils/httpRequest');
var Promise     = require('promise');

module.exports = function ReceiveUnavailabilityData() {
    this.run = function (listingsArgs, requestData) {
        var httpRequest = new HttpRequest();

        for ( var listingId in listingsArgs ) {
            var params = {
                url:  'https://api.airbnb.com/v2/calendar_days?',
                data: {
                    listing_id: listingId,
                    start_date: requestData.start_date
                }
            };

            httpRequest.get(
                params, generateListingsUnavailability
            ).then(function (percentage) {
                listingsArgs[listingId].unavailability = percentage;
            });
        }
    };

    function generateListingsUnavailability(listingsData) {
        var calendarDays    = listingsData.calendar_days,
            size            = calendarDays.length,
            unavailableDays = 0;

        for ( var i = 0; i < size; i++ ) {
            if ( !calendarDays[i].available ) unavailableDays++;
        }

        return unavailableDays / size;
    }
};