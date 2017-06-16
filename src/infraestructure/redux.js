import { createStore, combineReducers } from 'redux';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }

            return {
                state,
                completed: !state.completed
            }
        default:
            return state
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
        console.log('todos add');
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t, action)
            )
        default:
            return state
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'ADD_TODO':
            console.log('filter add');
            return state;
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

let store;

export default function getInstance() {
    if (!store) {
        store = createStore(combineReducers({todos,visibilityFilter}));
    }

    return store;
}