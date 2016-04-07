const trigger = {};
const slice = Array.prototype.slice;
const isObject = require("util").isObject;
const coroutine = require("coroutine");

let event = {};
let pending = 0;

trigger.on = function on(ev, func) {
	if (isObject(ev)) {
		for (let k in ev) {
			on(k, ev[k]);
		}
	} else {
		event[ev] = event[ev] || [];
		event[ev].push(func);
	}
};

trigger.once = function(ev, func) {
	let o = this;
	o.off(ev, func);
	o.on(ev, g);

	function g() {
		func.apply(o, arguments);
		o.off(ev, g);
	}
};

trigger.trigger = function(ev) {
	let args = arguments;
	let evs = event[ev] || [];
	evs.forEach(function(fn) {
		coroutine.start(() => {
			pending++;
			coroutine.start(() => fn.apply(null, slice.call(args, 1))).join();
			pending--;
		});
	});
};

trigger.triggerSync = function(ev) {
	let args = arguments;
	let evs = event[ev] || [];
	evs.forEach(fn => fn.apply(null, slice.call(args, 1)));
};

trigger.off = function off(ev, func) {
	if (arguments.length === 0) {
		event = {};
		return;
	}

	if (!func) {
		if (isObject(ev))
			for (let k in ev)
				off(k, ev[k]);
		else
			event[ev] = [];
		return;
	}

	let evs = event[ev] || [];
	for (let i = 0; i < evs.length; i++) {
		if (evs[i] === func) {
			event[ev] = arrayPop(evs, i);
			break;
		}
	}
};

trigger.fib = () => pending;

function arrayPop(arr, i) {
	return slice.call(arr, 0, i).concat(slice.call(arr, i + 1));
}

module.exports = trigger;
