require('babel-polyfill');

import style from './layout.scss';
import jsonRequest from './assets/mock.json';
import jsonRequestFill from './assets/mock.fill.json';
import ParserRequest from './infraestructure/parserRequest';
import metadata from '../package.json';
import getInstance from './infraestructure/redux';

let nextTodoId = 0
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

window.store;
function init() {
	appendComponents();
	setMetadata();

	window.store = getInstance();

	window.store.subscribe(render);

	setInterval(()=>{
		// console.log(window.store.getState());
	//	store.dispatch(addTodo('oppa'));
	}, 1000)
}

function render() {
	let element = document.querySelector('.version');

	element.innerHTML = JSON.stringify(store.getState());
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