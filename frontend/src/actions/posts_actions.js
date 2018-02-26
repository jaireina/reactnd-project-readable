import {
  add as addPostApi,
  getAll as getAllPosts, 
  edit as editPostApi,
  vote, 
  get as getPost, 
  deletePost as deletePostAPI,
  getComments
} from '../api/posts_api';

import {
  ADD_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  VOTE_POST,
  RECEIVE_POST_DETAIL,
  EDIT_POST,
  RECEIVE_POST_COMMENTS
} from '../actions/action_types';

/**
* Creates an action that is used when we're adding a post
* @param {Object} action
*/

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

/**
 * Connects to the API to add a new post. Once the server responds, it dispatches the addPost action
 * 
 * @param {Object} postData
 */
export const requestAddPost = postData => dispatch => addPostApi(postData).then(post=>dispatch(addPost(post)));

/**
* Creates an action that is used when we're editing a post
* @param {Object} action
*/
export const editPost = post => {
  return {
    type: EDIT_POST,
    post
  }
}

/**
 * Connects to the API to edit a post. Once the server responds, it dispatches the editPost action
 * 
 * @param {Object} postData
 */
export const requestEditPost = postData => dispatch => editPostApi(postData).then(post=>dispatch(editPost(post)));


/**
 * Creates an action that is used when we're receiving the posts to be set in the store
 * @param {*} posts 
 */
export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
};

/**
 * Connects to the API to retrieve all the existing posts 
 * and dispatches the recievePosts action once the posts 
 * info is received 
 */
export const fetchPosts = () => dispatch => getAllPosts()
                                              .then(posts => dispatch(receivePosts(posts)));


/**
 * Updates the list of posts with the one that was just updated
 * @param {Object} post the post that was voted and that needs to be updated in the list
 */
export const votePostSuccess = (post) => {
  return {
    type: VOTE_POST,
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
export const sendVote = (postId, voteType) => dispatch => vote(postId, voteType).then(post=> dispatch(votePostSuccess(post)) );


/**
 * Connects to the API to retrieve the full information of the requested post
 * and dispatches the recievePosts action once the posts 
 * info is received 
 * 
 * @param {String} postId
 */
export const fetchPost = (postId) => dispatch => getPost(postId)
                                                  .then(post => {dispatch(receivePost(post))});

/**
 * Creates an action that is used when we're receiving a detailed post
 * @param {Object} post
 */
export const receivePost = post => {
  return {
    type: RECEIVE_POST_DETAIL,
    post
  }
};


/**
 * Connects to the API to delete the post identified with id and dispatches
 * the deletePost action once the server responds
 * 
 * @param {String} id of the post to be deleted
 */
export const requestPostDeletion = (id) => dispatch => deletePostAPI(id).then(post => dispatch(deletePost(post)));

/**
 * Creates an action that is used when we're deleting a post
 * @param {Object} post
 */
export const deletePost = post => {
  return {
    type: DELETE_POST,
    post
  }
};

/**
 * Connects to the API to retrieve the comments of a post
 * and dispatches the receivePostComments action once the comments
 * are received
 * 
 * @param {String} postId
 */
export const fetchPostComments = (postId) => dispatch => getComments(postId).then(comments => dispatch(receivePostComments(comments, postId)));

/**
 * Creates an action that is used when we're receiving the comments of a post
 * @param {Object} comments
 * @param {Object} postId
 */
export const receivePostComments = (comments, postId) => {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments,
    postId
  }
};