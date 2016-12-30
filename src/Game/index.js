'use strict'

const immutable = require('immutable');
const fromJS = immutable.fromJS;
const Map = immutable.Map;


// REDUCER
module.exports.reducer = (state = fromJS(initialState), action) => {
  switch(action.type){
    case 'addPlayerToGame':
      return addPlayerToGame(state, action.player)
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
  return state.players.push(player)
}




module.exports.addPlayerToGame = addPlayerToGame;
