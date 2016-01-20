'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

var config = {
    root: rootPath,
	PORT: 3000
};

module.exports = config;
