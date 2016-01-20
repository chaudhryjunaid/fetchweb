'use strict';

var express     = require('express');

var config          = require('./config/config');
var winston         = require('./config/winston');

var app = express();

require('./config/express')(app);

app.listen(config.PORT);
winston.info('Express app started on port ' + config.PORT);

module.exports = app;
