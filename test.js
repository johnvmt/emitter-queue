/**
 * Created by jmurphy on 1/18/17.
 */
var queueEmitter = require('./')();

queueEmitter.on('ev', function(next) {
	console.log("HIT-1");
	next();
});

queueEmitter.on('ev', function(next) {
	console.log("HIT-2");
	next();
});

queueEmitter.once('ev', function(next) {
	console.log("HIT-3");
	next();
});

queueEmitter.emit('ev', function(error) {
	console.log(error, "COMPLETE");
});