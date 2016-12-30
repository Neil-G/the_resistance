'use strict'

const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const Game = require('./Game');
const gameReducer = Game.reducer;


// combine reducers
const AppReducer = combineReducers({
  game: gameReducer
});

// create store
module.exports = createStore(AppReducer);
