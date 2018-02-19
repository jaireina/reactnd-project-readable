import {
  ADD_COMMENT, 
  EDIT_COMMENT,
} from '../actions/comments_actions';

import {
  RECEIVE_POST_COMMENTS
} from '../actions/posts_actions';
import current_post_reducer from './current_post_reducer';

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
      const editedComment = action.comment;
      const editedCommentPostId = editedComment.parentId;
      const currentComments = state[editedCommentPostId]? state[editedCommentPostId]:[];
      const commentIndex = currentComments.findIndex(c=> c.id === editedComment.id);
      currentComments[commentIndex] = editedComment;
      return {...state, [editedCommentPostId]: currentComments};

    default: 
      return state;
  }
}

export default commentsReducer;