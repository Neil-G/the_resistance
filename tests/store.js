'use strict'

const test = require('tape')

const immutable = require('immutable');
const Map = immutable.Map;
let store = require('./../src/store')

test('game reducer', (t) => {
  t.plan(6);

  // INITIALIZE GAME
  t.true(
    Map.isMap(store.getState().game),
    'initializes game as an Immutable Map'
  );


  // ADD PLAYER
  const mockPlayer1 = { id: '1', name: 'Alan' }
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer1 })
  t.equal(
    store.getState().game.get('players').toJS()[0],
    mockPlayer1,
    'can add a player to the game'
  )


  // REMOVE PLAYER
  store.dispatch({ type: 'removePlayerFromGame',playerId: '1' })
  t.equal(
    store.getState().game.get('players').size, 0,
    'can remove a player from the game'
  )


  // SET SPIES
  const mockPlayer2 = { id: '2', name: 'Beth' };
  const mockPlayer3 = { id: '3', name: 'Carl' };
  const mockPlayer4 = { id: '4', name: 'Dan' };
  const mockPlayer5 = { id: '5', name: 'Erin' };
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer1 });
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer2 });
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer3 });
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer4 });
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer5 });
  store.dispatch({ type: 'setSpies' });
  t.equal(
    store.getState().game.get('spyIds').size, 2,
    'can set spies'
  );

  // SET LEADER
  store.dispatch({ type: 'setInitialLeader' })
  t.notEqual(
    store.getState().game.get('currentMission').get('leaderId'), undefined,
    'can set initial leader'
  )

  // Select a Player for the current mission
  store.dispatch({ type: 'selectPlayerForMission', playerId: '1' })
  t.equal(
    store.getState().game.get('currentMission').get('playerIdsSelectedForMission').size, 1,
    'can select a player for the mission'
  )
  showGameState(store)
});


function showGameState(store){
  console.log(store.getState().game)
}
