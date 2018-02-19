import {
  add as addCommentApi,
  edit as editCommentApi,
  deleteComment as deleteCommentApi
} from '../api/comments_api';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

/**
* Creates an action that is used when we're adding a comment
* @param {Object} action
*/

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

/**
 * Connects to the API to add a new comment. Once the server responds, it dispatches the addComment action
 * 
 * @param {Object} commentData
 */
export const requestAddComment = commentData => dispatch => addCommentApi(commentData).then(comment=>dispatch(addComment(comment)));


/**
* Creates an action that is used when we're editing a comment
* @param {Object} action
*/
export const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

/**
 * Connects to the API to edit a comment. Once the server responds, it dispatches the editComment action
 * 
 * @param {Object} commentData
 */
export const requestEditComment = commentData => dispatch => editCommentApi(commentData).then(comment=>dispatch(editComment(comment)));

/**
* Creates an action that is used when we're deleting a comment
* @param {Object} comment
*/
export const deleteComment = comment => {
  return {
    type: DELETE_COMMENT,
    comment
  }
};

/**
* Connects to the API to delete the comment identified with id and dispatches
* the deleteComment action once the server responds
* 
* @param {String} id of the comment to be deleted
*/
export const requestCommentDeletion = (id) => dispatch => deleteCommentApi(id).then(comment => dispatch(deleteComment(comment)));












/**
* Updates the list of posts with the one that was just updated
* @param {Object} post the post that was voted and that needs to be updated in the list
*/
export const voteCommentSuccess = (post) => {
  return {
    type: VOTE_COMMENT,
    post
  }
};

/**
* Connects to the API to vote for the post from postId 
* and dispatches the votePost action once the post 
* info is received back from the server
* 
* @param {String} postId
* @param {String} voteType upVote or downVote
*/
//export const sendVote = (postId, voteType) => dispatch => vote(postId, voteType).then(post=> dispatch(voteCommentSuccess(post)) );


