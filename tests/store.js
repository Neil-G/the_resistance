'use strict'

const test = require('tape')

const immutable = require('immutable');
const Map = immutable.Map;
let store = require('./../src/store')

test('game reducer', (t) => {
  t.plan(3);
  const initialGameState = store.getState().game;
  t.true(
    Map.isMap(initialGameState),
    'initializes game as an Immutable Map'
  );

  const mockPlayer1 = { id: '1', name: 'Alan' }
  store.dispatch({
    type: 'addPlayerToGame',
    player: mockPlayer1
  })


  t.equal(
    store.getState().game.get('players').toJS()[0],
    mockPlayer1,
    'can add a player to the game'
  )

  store.dispatch({
    type: 'removePlayerFromGame',
    playerId: '1'
  })

  t.true(
    store.getState().game.get('players').size == 0,
    'can remove a player from the game'
  )
})
