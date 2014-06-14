var trigger = {},
	event = {},
	pending = 0,
	slice = Array.prototype.slice;

trigger.on = function(ev, func) {
	if(isObject(ev))
		for(var k in ev)
			on(k, ev[k]);
	else
		on(ev, func);

	function on(e, fn){
		var evs = event[e];
		if (!evs) {
			evs = event[e] = [];
		}
		evs.push(fn);
	}
};

trigger.once = function(ev, func) {
	var o = this;
	o.off(ev, func);
	o.on(ev, g);
	
	function g(){
		func.apply(o, arguments);
		o.off(ev, g);
	}
};

trigger.trigger = function(ev) {
	var args = arguments;
	var evs = event[ev] || [];
	evs.forEach(function(fn) {
		(function() {
			pending++;
			var fib = (function() {
				fn.apply(null, slice.call(args, 1));
			}).start();
			fib.join();
			pending--;
		}).start();
	});
};

trigger.triggerSync = function(ev) {
	var args = arguments;
	var evs = event[ev] || [];
	evs.forEach(function(fn) {
		fn.apply(null, slice.call(args, 1));
	});
};

trigger.off = function(ev, func) {
	if(!ev){
		event = {};
		return;
	}
	if(!func){
		if(isObject(ev))
			for(var k in ev)
				off(k, ev[k]);
		else
			event[ev] = [];
		return;
	}
	off(ev, func);
	function off(e, fn){
		var evs = event[e] || [];
		for(var i=0; i<evs.length; i++){
			if(evs[i] === fn){
				event[e] = arrayPop(evs, i);
				break;
			}
		}
	}
};

trigger.fib = function() {
	return pending;
};

function arrayPop(arr, i){
	return slice.call(arr, 0, i).concat(slice.call(arr, i+1));
}

function isObject(arg) {
	return typeof arg === 'object' && arg !== null;
}

module.exports = trigger;