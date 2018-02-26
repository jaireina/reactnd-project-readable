import {
  RECEIVE_POST_DETAIL,
  VOTE_POST,
  EDIT_POST
} from '../actions/action_types';

const initialCurrentPostState = {};

function currentPostReducer(state=initialCurrentPostState, action){
  switch(action.type){
    
    case RECEIVE_POST_DETAIL:
    case VOTE_POST:
    case EDIT_POST:
      return {...action.post};

    default: 
      return state;
  }
}

export default currentPostReducer;