module.exports = function DemandAlgorithm() {
    this.run = function (listingsArgs) {
        for ( var listingId in listingsArgs ) {
            var listing = listingsArgs[listingId];
            listingsArgs[listingId].demand = calculatedDemand(listing);
        }

        return listingsArgs;
    };

    function calculatedDemand(listing) {
        return ( 0.2 * listing.price ) + ( 0.4 * listing.property.reviews ) + ( 0.4 * listing.property.rating )
    }
};