'use strict'

const immutable = require('immutable');
const fromJS = immutable.fromJS;
const Map = immutable.Map;
const List = immutable.List;


// REDUCER
module.exports.reducer = (state = fromJS(initialState), action) => {
  switch(action.type){
    case 'addPlayerToGame':
      return addPlayerToGame(state, action.player);
    case 'removePlayerFromGame':
      return removePlayerFromGame(state, action.playerId);
    case 'setSpies':
      return setSpies(state);
    case 'setInitialLeader':
      return setInitialLeader(state);
    case 'selectPlayerForMission':
      return selectPlayerForMission(state, action.playerId);
    default:
      return state
  }
}


// INITIAL STATE
const initialState = {
  id: undefined,
  spyIds: [],
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

function setSpies(state){
  const numberofPlayers = state.get('players').size;
  if (numberofPlayers < 5) return state
  const numberOfSpies = Math.ceil( numberofPlayers / 3);
  let spyIndexes = [];
  while (spyIndexes.length < numberOfSpies){
    let randomIndex = Math.floor(Math.random() * numberofPlayers)
    if (!spyIndexes.includes(randomIndex)) spyIndexes.push(randomIndex)
  }
  const updatedSpyIds = spyIndexes.map((index) => state.get('players').toJS()[Number(index)].id)
  return state.setIn(['spyIds'], List(updatedSpyIds));
}

function setInitialLeader(state) {
  const numberofPlayers = state.get('players').size;
  if (numberofPlayers < 5) return state
  let randomIndex = Math.floor(Math.random() * numberofPlayers)
  return state.setIn(['currentMission', 'leaderId'], state.get('players').toJS()[Number(randomIndex)].id)
}

function selectPlayerForMission(state, playerId) {
  // only leader can select
  // id must be valid player id
  // mission must not be full
  return state.setIn(
    ['currentMission', 'playerIdsSelectedForMission'],
    state.get('currentMission').get('playerIdsSelectedForMission').push(playerId)
  );
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

function calculateMissionSize(numberOfPlayers, missionNumber) {
  if (NumberOfPlayers == 5) {
    return [2, 3, 2, 3, 3][ missionNumber - 1 ]
  } else if (NumberOfPlayers == 6) {
    return [2, 3, 4, 3, 4][ missionNumber - 1 ]
  } else if (NumberOfPlayers == 7) {
    return [2, 3, 3, 4, 4][ missionNumber - 1 ]
  } else if ((NumberOfPlayers > 7) && (NumberOfPlayers < 11)) {
    return [3, 4, 4, 5, 5][ missionNumber - 1 ]
  }
}
