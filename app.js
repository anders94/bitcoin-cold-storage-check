var async = require('async');
var request = require('request');
var addresses = require('./addresses');

var baseurl = 'https://insight.bitpay.com';
var total = 0;
var rate;

request('https://api.bitfinex.com/v1/pubticker/BTCUSD', function (error, response, body) {
    if (!error) {
	try {
	    var o = JSON.parse(body);
	    rate = o.last_price;
	}
	catch (e) { }
	async.eachSeries(addresses, function(address, done) {
	    request(baseurl+'/api/addr/'+address, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    var o = JSON.parse(body);
		    total += o.balance
		    console.log(o.addrStr+' - '+o.balance+' BTC / $'+fmt((o.balance*rate).toFixed(2)));
		}
		done(error);
	    });
	}, function(err) {
	    if (err)
		console.log(err);
	    console.log('total: '+total+' BTC / $'+fmt((total*rate).toFixed(2))+' at $'+fmt(rate));
	});
    }
    else
	console.log(error);
});

function fmt(num) {
    var n = num.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
        return p<0 || i<p ? ($0+',') : $0;
    });
};
