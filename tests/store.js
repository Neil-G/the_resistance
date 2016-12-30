'use strict'

const test = require('tape')

const immutable = require('immutable');
const Map = immutable.Map;
let store = require('./../src/store')

test('store', (t) => {
  t.plan(1);
  const initialGameState = store.getState().game;
  t.true(Map.isMap(initialGameState));
  console.log(store.getState());
})
