'use strict'

const immutable = require('immutable');
const fromJS = immutable.fromJS;
const Map = immutable.Map;


// REDUCER
module.exports.reducer = (state = fromJS(initialState), action) => {
  switch(action.type){
    case 'addPlayerToGame':
      return addPlayerToGame(state, action.player)
      case 'removePlayerFromGame':
        return removePlayerFromGame(state, action.playerId)
    default:
      return state
  }
}


// INITIAL STATE
const initialState = {
  id: undefined,
  spyIdArray: [],
  players: [],
  pastMissions: [],
  currentMission: {
    failedProposals: [],
    acceptedProposal: {},
    leaderId: undefined,
    playersSelectedForMission: [],
    acceptanceVotes: {},
    passFailVotes: []
  }
}


// MUTATION FUNCTIONS
function addPlayerToGame(state, player) {
  const updatedPlayersList = state.get('players').push(player);
  return state.setIn(['players'], updatedPlayersList);
}

function removePlayerFromGame(state, playerId) {
  const playerIndex = state.get('players').findIndex((player) => playerId == player.id);
  const updatedPlayersList = state.get('players').delete(playerIndex);
  return state.setIn(['players'], updatedPlayersList);
}


module.exports.addPlayerToGame = addPlayerToGame;
