var fs = require('fs');

var readFile = function(filename, callback) {

    var fileCallback = function(err, data) {

        if (err) {
            throw new Error(err);
        }

        callback(JSON.parse(data));
    };

    if (/\.json/gi.test(filename)) {

        fs.readFile(filename, 'utf-8', fileCallback);
    } else {

        throw new TypeError('Invalid config type');
    }
};

module.exports =  {
    readFile : readFile
};