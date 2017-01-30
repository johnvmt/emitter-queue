## Queue Emitter ##

Emit events in series, rather than in parallel

Each function called must call the next() argument, which is passed in last

### Usage ###

	var queueEmitter = require('queue-emitter')();
	
	queueEmitter.on('ev', function(arg1, arg2, next) {
		console.log(arg1, arg2, "HIT-1");
		next('uh-oh');
	});
	
	queueEmitter.on('ev', function(arg1, arg2, next) {
		console.log(arg1, arg2, "HIT-2");
		next();
	});
	
	queueEmitter.once('ev', function(arg1, arg2, next) {
		// Will run the first time, removed after that
		console.log(arg1, arg2, "HIT-2");
		next();
	});
	
	queueEmitter.emit('ev', 1, 2, function(error) {
		console.log(error, "COMPLETE");
	});
	
	queueEmitter.emit('ev', 1, 2, function(error) {
		console.log(error, "COMPLETE");
	});