require('babel-polyfill');

import jsonRequest from './assets/mock.json';
import jsonRequestFill from './assets/mock.fill.json';
import ParserRequest from './infraestructure/parserRequest';

function init() {
	appendComponents();
}

function appendComponents() {
	let el = document.querySelector(".app");

	new ParserRequest(jsonRequestFill).appendTo(el);
}

document.addEventListener("DOMContentLoaded", init, false);