'use strict';

const test = require('tape')
const immutable = require('immutable');
const Map = immutable.Map;
let store = require('./../src/store');
let calculateMissionSize = require('./../src/Game').calculateMissionSize;

test('game reducer', (t) => {
  t.plan(9);

  // INITIALIZE GAME
  t.true(
    Map.isMap(store.getState().game),
    'initializes game as an Immutable Map'
  );


  // ADD PLAYER
  const mockPlayer1 = { id: '1', name: 'Alan' };
  store.dispatch({ type: 'addPlayerToGame', player: mockPlayer1 });
  t.equal(
    store
      .getState()
      .game
      .get('players')
      .get(0),
    mockPlayer1,
    'can add a player to the game'
  );


  // REMOVE PLAYER
  store.dispatch({ type: 'removePlayerFromGame', playerId: '1' });
  t.equal(
    store
      .getState()
      .game
      .get('players')
      .size,
    0,
    'can remove a player from the game'
  );


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
    store
      .getState()
      .game
      .get('spyIds')
      .size,
    2,
    'can set spies'
  );

  // SET LEADER
  store.dispatch({ type: 'setInitialLeader' });
  t.notEqual(
    store
      .getState()
      .game
      .getIn(['currentMission', 'leaderId']),
    undefined,
    'can set initial leader'
  );

  // Select a Player for the current mission
  store.dispatch({ type: 'selectPlayerForMission', playerId: '1' });
  t.equal(
    store
      .getState()
      .game
      .getIn(['currentMission', 'playerIdsSelectedForMission'])
      .size,
    1,
    'can select a player for the mission'
  );

  // Unselect a Player for the current mission
  store.dispatch({ type: 'unselectPlayerForMission', playerId: '1' });
  t.equal(
    store
      .getState()
      .game
      .getIn(['currentMission', 'playerIdsSelectedForMission'])
      .size,
    0,
    'can unselect a player for the mission'
  );

  // vote on mission acceptance
  store.dispatch({ type: 'voteOnMissionAcceptance', playerId: '2', vote: true });
  t.true(
    store
      .getState()
      .game
      .getIn(['currentMission', 'acceptanceVotes', '2']),
    'can vote on whether to accept a mission or not'
  );

  // remove acceptance vote
  store.dispatch({ type: 'removeAcceptanceVote', playerId: '2' });
  t.false(
    store
      .getState()
      .game
      .hasIn(['currentMission', 'acceptanceVotes', '2']),
    'can remove acceptance vote'
  );

  store.dispatch({ type: 'voteOnMissionAcceptance', playerId: '2', vote: true });
  store.dispatch({ type: 'voteOnMissionAcceptance', playerId: '3', vote: false });
  store.dispatch({ type: 'countMissionVotes' });


  // console.log(calculateMissionSize(6,3));
  // showGameState(store);
});


function showGameState(store){
  console.log(store.getState().game);
}
