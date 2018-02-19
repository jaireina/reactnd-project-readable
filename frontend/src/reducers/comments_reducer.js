import {
  ADD_COMMENT,
} from '../actions/comments_actions';

import {
  RECEIVE_POST_COMMENTS
} from '../actions/posts_actions';

const initialState = {};

function commentsReducer(state=initialState, action){
  switch(action.type){
    case ADD_COMMENT:
      const {comment} = action;
      const postId = comment.parentId;
      const currentPostComments = state[postId]? state[postId]:[];
      currentPostComments.push(comment);
      return {...state, [postId]: currentPostComments};
    
    case RECEIVE_POST_COMMENTS:
      return {...state, [action.postId]: action.comments};

    default: 
      return state;
  }
}

export default commentsReducer;