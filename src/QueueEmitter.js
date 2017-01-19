var EventEmitter = require('wolfy87-eventemitter');

function QueueEmitter() { }

QueueEmitter.prototype.__proto__ = EventEmitter.prototype;

/**
 * @param event
 * @param arguments
 * @param callback
 */
QueueEmitter.prototype.emit = function() {
	var emitter = this;

	var eventArgs = Array.prototype.slice.call(arguments);
	var eventName = eventArgs.shift(); // first argument
	var completeCallback = eventArgs.pop(); // last argument

	// Get all subscribed functions
	var listenersConfig = emitter.getListeners(eventName);
	var listenersFns = [];
	listenersConfig.forEach(function(listenerConfig) {
		listenersFns.push(listenerConfig.listener);
	});

	this._callbackQueue(
		listenersFns,
		eventArgs,
		function(error) {
			// callback queue completed
			// remove 'once' callbacks
			listenersConfig.filter(function(listenerConfig) {
				return listenerConfig.once; // remove functions whose 'once' attribute is true
			}).forEach(function (listenerConfig) {
				emitter.off(eventName, listenerConfig.listener);
			});

			if(typeof completeCallback == 'function')
				completeCallback(error); // callback with an error, if any
		}
	);
};

/**
 *
 * @param queueFunctions
 * @param queueFunctionArgs
 * @param queueComplete
 * @private
 */
QueueEmitter.prototype._callbackQueue = function(queueFunctions, queueFunctionArgs, queueComplete) {
	var index = -1;
	function queueFunctionComplete(error) {
		index++;
		if(typeof error != 'undefined' || typeof queueFunctions[index] != 'function') // reached end of queue or function in queue returned an error
			queueComplete(error);
		else
			queueFunctions[index].apply(this, queueFunctionArgs.concat([queueFunctionComplete]));
	}
	queueFunctionComplete();
};

module.exports = function() {
	return new QueueEmitter();
};