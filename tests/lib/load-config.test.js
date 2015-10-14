var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

var lf = require('../../lib/load-config.js');

describe('Test Watcher', function() {
    describe('\n\tConfig load test', function() {
        it('Should return error, cause file don\'t macth if a JSON', function() {

            assert.throws(function(){ lf.readFile('Watcher.teste'); }, Error, function() { new TypeError('Invalid config type'); })
        });

        it('Should return config.json like a object', function() {

            lf.readFile('config.json', function(obj) {

                asser.equal(typeof obj, 'object');
                console.info(obj);
                done();
            });
        });
    });
});