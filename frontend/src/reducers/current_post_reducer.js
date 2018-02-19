import {
  RECEIVE_POST_DETAIL,
  VOTE_POST,
  RECEIVE_POST_COMMENTS
} from '../actions/posts_actions';

import {
  ADD_COMMENT
} from '../actions/comments_actions';

import { RECEIVE_CATEGORIES } from '../actions/categories_actions';

const initialCurrentPostState = {};

function currentPostReducer(state=initialCurrentPostState, action){
  switch(action.type){
    
    case RECEIVE_POST_DETAIL:
      return {...action.post};

    case VOTE_POST:
      return {...action.post};

    default: 
      return state;
  }
}

export default currentPostReducer;