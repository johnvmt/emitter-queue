/**
 * Created by jmurphy on 1/18/17.
 */
var queueEmitter = require('./')();

queueEmitter.on('ev', function(arg1, arg2, next) {
	console.log(arg1, arg2, "HIT-1");
	next('uh-oh');
});

queueEmitter.on('ev', function(arg1, arg2, next) {
	console.log(arg1, arg2, "HIT-2");
	next();
});

queueEmitter.once('ev', function(arg1, arg2, next) {
	console.log(arg1, arg2, "HIT-2");
	next();
});

queueEmitter.emit('ev', 1, 2, function(error) {
	console.log(error, "COMPLETE");
});

queueEmitter.emit('ev', 1, 2, function(error) {
	console.log(error, "COMPLETE");
});