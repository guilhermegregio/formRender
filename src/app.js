require('babel-polyfill');

import style from './layout.scss';
import jsonRequest from './assets/mock.json';
import jsonRequestFill from './assets/mock.fill.json';
import ParserRequest from './infraestructure/parserRequest';
import metadata from '../package.json';

function init() {
	appendComponents();
	setMetadata();
}

function appendComponents() {
	let el = document.querySelector(".app");

	new ParserRequest(jsonRequest).appendTo(el);
}

function setMetadata() {
	let elAppName = document.querySelectorAll('.appName');
	let elVersion = document.querySelectorAll('.version');
	let elAuthor = document.querySelector('.author');

	elAppName.forEach(el => {
		el.textContent = metadata.description;
	});

	elVersion.forEach(el => {
		el.textContent = `v${metadata.version}`;
	});

	elAuthor.textContent = metadata.author;

	document.title = metadata.description;
}

document.addEventListener("DOMContentLoaded", init, false);