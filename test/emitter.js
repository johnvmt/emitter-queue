var assert = require('assert');

describe('Queue Emitter', function(){

	it('should return an _id when doc is inserted', function (done) {
		var QE = require('../');
		var queueEmitter = new QE();

		var hits = 0;

		queueEmitter.on('ev', function (next) {
			hits++;
			next();
		});

		queueEmitter.on('ev', function (next) {
			hits++;
			next();
		});

		queueEmitter.once('ev', function (next) {
			hits++;
			next();
		});

		queueEmitter.emit('ev', function (error) {
			if(hits = 3)
				done();
			else
				throw new Error("wrong # of hits");
		});
	});
});