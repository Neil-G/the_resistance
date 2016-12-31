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
    playerIdsSelectedForMission: [],
    acceptanceVotes: {},
    passFailVotes: []
  }
}


// MUTATION FUNCTIONS
function addPlayerToGame(state, player) {
  if (state.get('players').size > 9) return state
  const updatedPlayersList = state.get('players').push(player);
  return state.setIn(['players'], updatedPlayersList);
}

function removePlayerFromGame(state, playerId) {
  if (state.get('players').size == 0) return state
  const playerIndex = state.get('players').findIndex((player) => playerId == player.id);
  const updatedPlayersList = state.get('players').delete(playerIndex);
  return state.setIn(['players'], updatedPlayersList);
}

function chooseSpies(state){
  if (state.get('players').size < 5) return state
}

function chooseInitialLeader(state) {
  if (state.get('players').size < 5) return state
}

function selectPlayerForMission(state, id) {
  // pushes id to playerIds.SelectedForMission
}

function unselectPlayerForMission(state, id) {
  // removes id from playerIds.SelectedForMission
}

function voteOnMissionAcceptance(state, playerId, vote) {
  // adds entry to acceptanceVotes object
}

function removeAcceptanceVote(state, playerId) {
  // set the key with playerId to undefined in acceptanceVotes object
}

function acceptMissionVoting(state) {
  // determine if mission is accepted or not
  // add to failed missions
}

function changeLeader(state) {
  // determine if mission is ccepted or not
  //
}

function castMissionVote(state, vote) {
  // players
}

function endMission(state) {
  // move currentMission to PastMissionsArray
}
