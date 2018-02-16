import {
  add  
} from '../api/comments_api';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';


export const addComment = (comment) => {
  console.log(comment);
  return {
    type: ADD_COMMENT
  }
}





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
export const sendVote = (postId, voteType) => dispatch => vote(postId, voteType).then(post=> dispatch(voteCommentSuccess(post)) );


/**
* Connects to the API to delete the post identified with id and dispatches
* the deletePost action once the server responds
* 
* @param {String} id of the post to be deleted
*/
export const requestCommentDeletion = (id) => dispatch => deleteCommentApi(id).then(post => dispatch(deleteComment(post)));

/**
* Creates an action that is used when we're deleting a post
* @param {Object} post
*/
export const deleteComment = comment => {
  return {
    type: DELETE_POST,
    comment
  }
};
