const addEvent = (evnt, elem, func) => {
   if (elem.addEventListener) elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) elem.attachEvent("on"+evnt, func);
   else elem["on"+evnt] = func;
}

const arraysEqual = (a, b) => {
	if (a === b) return true;
	if (a.length !== b.length) return false;

	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}

	return true;
};

const konami = () => {
	let buffer = [];
	let lastKeyTime = Date.now();
	const charList = ['b', 'a', 'arrowup', 'arrowdown', 'arrowright', 'arrowleft'];

	addEvent('keydown', document, event => {

		const key = event.key.toLowerCase();

		// we are only interested in keys that are part of the konami code
		if (charList.indexOf(key) === -1) return;

		const currentTime = Date.now();

		// Reset buffer array if user didn't enter a sequential key within 0.5 seconds
		if (currentTime - lastKeyTime > 500) buffer = [];

		// Reset buffer if it is longer that the konami code
		if (buffer.length > 10) buffer = [];

		buffer.push(key);
		lastKeyTime = currentTime;

		const acceptedArray = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
		
		if (arraysEqual(buffer, acceptedArray)) {
			// User has entered the konami code do something cool!
			console.log('Konami code entered!')
		}
	});
};

addEvent('DOMContentLoaded', document, () => {
	'use strict';
	konami();
});