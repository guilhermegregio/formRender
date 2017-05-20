require('babel-polyfill');

import jsonRequest from './assets/mock.json';
import TextComponent from './components/text/text.component';

function init() {
	appendComponents();
}

function appendComponents() {

	let MapComponents = {
		text: TextComponent,
		call: (type, params) => {
			let Component = MapComponents[type];

			if (!Component) {
				Component = class {
					appendTo() { }
				};
			}

			return new Component(params);
		}
	};

	let el = document.querySelector(".app");

	jsonRequest.fields.forEach(field => {
		let type = field.type.match(/([a-z]+)/)[1];

		MapComponents.call(type, field).appendTo(el);
	});
}

document.addEventListener("DOMContentLoaded", init, false);