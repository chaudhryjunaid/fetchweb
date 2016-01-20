'use strict';

var express = require('express');
var compression = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var winston = require('./winston');

var title = require('../controllers/title');

module.exports = function(app) {

    winston.info('Initializing Express');

    app.set('showStackError', true);    
    
    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use(logger('dev', { "stream": winston.stream }));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // ROUTES
    app.get('/callback/I/want/title',title.titleViaCallback);
    app.get('/async/I/want/title',title.titleViaAsync);
    app.get('/promise/I/want/title',title.titleViaPromises);
    app.get('/I/want/title',title.titleViaPromises); // default route

    app.use('*',function(req, res){
        res.status(404).send('404');
    });

    app.use(function(err, req, res, next) {

        //Log it
        winston.error(err);

        //Error page
        res.status(500).send('Server Error');
    });

};
