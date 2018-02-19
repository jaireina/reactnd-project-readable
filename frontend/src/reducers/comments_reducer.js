import {
  ADD_COMMENT, 
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
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

    case EDIT_COMMENT:
    case VOTE_COMMENT:
    case DELETE_COMMENT:
      return {...state, 
              [action.comment.parentId]: _replaceCommentInList(action.comment, state)};
    
    default: 
      return state;
  }
}

function _replaceCommentInList(comment, state){
  const {parentId} = comment;
  const currentComments = state[parentId]? state[parentId]:[];
  const commentIndex = currentComments.findIndex(c=> c.id === comment.id);
  currentComments[commentIndex] = comment;
  return currentComments;
}

export default commentsReducer;