'use strict';

var _ = require('lodash');
var request = require('request');
var $ = require("cheerio");
var async = require('async');
var Promise = require('bluebird');
var rp = require('request-promise');

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
    var responseList = [];
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

exports.titleViaAsync = function(req, res) {
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
                return callback(null, "<li>"+address+" - "+error.message+"</li>");
            }
            if (response.statusCode != 200) {
                return callback(null, "<li>"+address+" - HTTP Status "+response.statusCode+" received</li>");
            }

            var title = $("title",body).html();
            callback(null, "<li>"+title+"</li>");
        });
    }

    function sendResultDoc(err,responseList){
        winston.info(responseList);
        res.send(preamble+responseList.join('')+postscript);
    }

    async.map(addressList, getAddressListItem, sendResultDoc);

};

exports.titleViaPromises = function(req, res) {
    var addressList = req.query.address;

    if (!addressList){
        return res.send(preamble+"<li>You did not provide any addresses.</li>"+postscript);
    }

    if(!_.isArray(addressList)){
        addressList = [addressList];
    }

    function getAddressListItem(address){
        return rp(address)
            .then(function (body) {
                var title = $("title",body).html();
                return "<li>"+title+"</li>";
            })
            .catch(function (error) {
                return "<li>"+address+" - "+error.message+"</li>";
            });
    }

    function sendResultDoc(err,responseList){
        winston.info(responseList);
        res.send(preamble+responseList.join('')+postscript);
    }

    var addressPromises = _.map(addressList, function(address){
        return getAddressListItem(address);
    });

    Promise.all(addressPromises).then(function(responseList){
        winston.info(responseList);
        res.send(preamble+responseList.join('')+postscript);
    }).catch(function(err){
        return res.send(preamble+"<li>Unexpected Error.</li>"+postscript);
    });

};
