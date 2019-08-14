(function() {
'use strict';

let ngHttp = null;

class PoloniexService {

    // static $inject = ['$http'];

    constructor($http) {
        this.$http = $http;

        // test
        ngHttp = $http
    }

    returnTicker() {
        // let ticker = this.$http.get('https://poloniex.com/public?command=returnTicker');
        let ticker = ngHttp.get('https://poloniex.com/public?command=returnTicker');
        return ticker;
    }

    returnOrderbook() {
        let orderbook = this.$http.get('https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=10');
        return orderbook;
    }

    returnCurrencies() {
        return this.$http.get("https://poloniex.com/public?command=returnCurrencies")
    }
}

angular.module('adminApp').service('PoloniexService',
    ['$http', PoloniexService]);
})();