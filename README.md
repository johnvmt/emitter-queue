## Queue Emitter ##

Emit events in series, rather than in parallel
Functions can be asynchronous (next function will start after the first function's Promise resolves)
Functions can halt the emitter

Note: values returned by the functions are ignored. The arguments passed are the ones passed into the emit function

### Usage ###

#### 2 Functions, One asynchronous 

	const emitter = new QueueEmitter();
    
	function callback1(obj) {
		obj.key1 = 'val1';
	}

	async function callback2(obj) {
		return new Promise(async function(resolve, reject) {
			setTimeout(() => {
				obj.key2 = 'val2';
				resolve();
			}, 100);
		});
	}

	emitter.on('eventname', callback1);
	emitter.on('eventname', callback2);

	let obj = {
		key0: 'val0'
	};

	await emitter.emit('eventname', obj);

	if(obj.key0 !== 'val0' || obj.key1 !== 'val1' || obj.key2 !== 'val2')
		throw new Error('values not set properly');
		
#### Reject in one callback ####

	const emitter = new QueueEmitter();

	function callback1(obj) {
		obj.key1 = 'val1';
	}

	async function callback2(obj) {
		throw new Error('some_error')
	}

	emitter.on('eventname', callback1);
	emitter.on('eventname', callback2);

	try {
		await emitter.emit('eventname', {});
	}
	catch(error) {
		if(error.message !== 'some_error')
			throw error;
	}
	
#### Useage with 'once' ####

	const emitter = new QueueEmitter();

	let triggered = false;
	function callback1(obj) {
		if(triggered)
			throw new Error('previously_triggered');
		triggered = true;
	}

	emitter.once('eventname', callback1);

	await emitter.emit('eventname', {});
	await emitter.emit('eventname', {});
