'use strict';

var _ = require('lodash');
var request = require('request');
var $ = require("cheerio");

var winston = require('../config/winston');

var preamble = "<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>";
var postscript = "</ul></body></html>";

exports.titleViaCallback = function(req, res) {
    var addressList = req.query.address;

    if (!addressList){
        return res.send(preamble+"<li>You did not provide any addresses.</li>"+postscript);
    }

    if(!_.isArray(addressList)){
        addressList = [addressList];
    }

    function getAddressListItem(address, callback){
        request(address, function (error, response, body) {
            if(error){
                return callback("<li>"+address+" - "+error.message+"</li>");
            }
            if (response.statusCode != 200) {
                return callback("<li>"+address+" - HTTP Status "+response.statusCode+" received</li>");
            }

            var title = $("title",body).html();
            callback("<li>"+title+"</li>");
        });
    }
    var responseList = []
    function sendResultDoc(listItem){
        winston.info(listItem);
        responseList.push(listItem);

        if(responseList.length === addressList.length){
            res.send(preamble+responseList.join('')+postscript);
        }
    }
    _.forEach(addressList, function(address){
        getAddressListItem(address, sendResultDoc);
    });

};

