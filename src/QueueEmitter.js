import EventEmitter from 'wolfy87-eventemitter';

class QueueEmitter extends EventEmitter {
	constructor() {
		super();
	}

	async emit(eventName) {
		const eventArgs = Array.prototype.slice.call(arguments, 1);
		const eventListenerConfigs = this.getListeners(eventName); // Get all subscribed functions

		for(let index in eventListenerConfigs) {
			if(eventListenerConfigs.hasOwnProperty(index)) {
				const eventListenerConfig = eventListenerConfigs[index];
				if(eventListenerConfig.once)
					this.off(eventName, eventListenerConfig.listener);
				await eventListenerConfig.listener.apply(this, eventArgs);
			}
		}
	}
}

export default QueueEmitter;
