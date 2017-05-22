require('babel-polyfill');

import jsonRequest from './assets/mock.json';
import ParserRequest from './infraestructure/parserRequest';

function init() {
	appendComponents();
}

function appendComponents() {
	let el = document.querySelector(".app");

	new ParserRequest(jsonRequest).appendTo(el);
}

document.addEventListener("DOMContentLoaded", init, false);