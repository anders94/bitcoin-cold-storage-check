# bitcoin-cold-storage-check
Display the amount of bitcoin stored in cold storage addresses. Uses api.bitfinex.com 
and insight.bitpay.com for data.

Setup
-----
Start by installing the dependancies:

    npm install

Copy the addresses.json.example to addresses.json:

    cp addresses.json.example addresses.json

Edit and add the addresses you wish to track.

Run
---
Find out the present value in USD of the addresses in addresses.json:

    node app

Notes
-----
This package first gets the current USD / BTC price from Bitfinex. Support 
for other exchanges isn't yet available.

This tool also relies on [Insight from BitPay](https://github.com/bitpay/insight). You can run your own copy of 
Insight locally so you aren't "tipping your hand" to the world about your
cold storage addresses.
