'use strict';

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

    case 'unselectPlayerForMission':
      return unselectPlayerForMission(state, action.playerId);

    case 'voteOnMissionAcceptance':
      return voteOnMissionAcceptance(state, action.playerId, action.vote);

    case 'removeAcceptanceVote':
        return removeAcceptanceVote(state, action.playerId);

    case 'countMissionVotes':
        return countMissionVotes(state);

    default:
      return state;
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
  return state.set(
    'players',
    state
      .get('players')
      .push(player)
  );
}

function removePlayerFromGame(state, playerId) {
  if (state.get('players').size == 0) return state
  const playerIndex = state
    .get('players')
    .findIndex((player) => playerId == player.id);
  return state.set(
    'players',
    state
      .get('players')
      .delete(playerIndex)
  );
}

function setSpies(state) {
  const numberofPlayers = state.get('players').size;
  if (numberofPlayers < 5) return state
  const numberOfSpies = Math.ceil( numberofPlayers / 3 );
  let spyIndexes = [];
  while (spyIndexes.length < numberOfSpies){
    let randomIndex = Math.floor(Math.random() * numberofPlayers);
    if (!spyIndexes.includes(randomIndex)) spyIndexes.push(randomIndex)
  }
  const updatedSpyIds = spyIndexes
    .map( (index) => state
      .get('players')
      .get(index)
      .id
    );
  return state.set(
    'spyIds',
    List(updatedSpyIds)
  );
}

function setInitialLeader(state) {
  const numberofPlayers = state.get('players').size;
  if (numberofPlayers < 5) return state
  let randomIndex = Math.floor(Math.random() * numberofPlayers);
  return state.setIn(
    ['currentMission', 'leaderId'],
    state
      .get('players')
      .get(randomIndex)
      .id
  );
}

function selectPlayerForMission(state, playerId) {
  // only leader can select
  // id must be valid player id
  // mission must not be full
  return state.setIn(
    ['currentMission', 'playerIdsSelectedForMission'],
    state
      .getIn(['currentMission', 'playerIdsSelectedForMission'])
      .push(playerId)
  );
}

function unselectPlayerForMission(state, playerId) {
  // removes id from playerIds.SelectedForMission
  const playerIdIndex = state
    .getIn(['currentMission', 'playerIdsSelectedForMission'])
    .indexOf(playerId);
  return state.setIn(
    ['currentMission', 'playerIdsSelectedForMission'],
    state
      .getIn(['currentMission', 'playerIdsSelectedForMission'])
      .delete(playerIdIndex)
  );
}

function voteOnMissionAcceptance(state, playerId, vote) {
  // adds entry to acceptanceVotes object
  return state.setIn(
    ['currentMission', 'acceptanceVotes', playerId],
    vote
  );
}

function removeAcceptanceVote(state, playerId) {
  return state.deleteIn(['currentMission', 'acceptanceVotes', playerId]);
}

function countMissionVotes(state) {
  // determine if mission is accepted or not
  // if more accept votes, proceed to mission
  // else add to failed proposals
  let acceptCount = 0;
  state
    .getIn(['currentMission', 'acceptanceVotes'])
    .forEach((vote) => vote ? acceptCount++ : acceptCount-- );
  if (acceptCount > 0) {

  } else {

  }
  return state;
}

function changeLeader(state) {
  // change leader id to next on list, or first if leader is current last on list

}

function castMissionVote(state, vote) {
  // players
}

function endMission(state) {
  // move currentMission to PastMissionsArray
}

function calculateMissionSize(numberOfPlayers, missionNumber) {
  if (numberOfPlayers == 5) {
    return [2, 3, 2, 3, 3][ missionNumber - 1 ];
  } else if (numberOfPlayers == 6) {
    return [2, 3, 4, 3, 4][ missionNumber - 1 ];
  } else if (numberOfPlayers == 7) {
    return [2, 3, 3, 4, 4][ missionNumber - 1 ];
  } else if ((numberOfPlayers > 7) && (numberOfPlayers < 11)) {
    return [3, 4, 4, 5, 5][ missionNumber - 1 ];
  }
}

module.exports.calculateMissionSize = calculateMissionSize;
