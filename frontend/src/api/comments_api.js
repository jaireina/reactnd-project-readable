import uuidv4 from 'uuid/v4';
import {doGet, doPost, doDelete, doPut} from '../util/fetch';

/**
 * Add a new comment with the given data
 * 
 * @param {object} data of the comment to be created
 * @return {Promise} that resolves to an object with the comment information
 */
export const add = (data) => {
  
  let comment = {id: uuidv4(), timestamp: Date.now(), ...data};

  return doPost(`/comments`, comment);
};

/**
 * Edit a comment with the given data
 * 
 * @param {object} data of the comment to be edited
 * @return {Promise} that resolves to an object with the comment information
 */
export const edit = (data) => {
  
  let comment = { ...data, timestamp: Date.now()};

  return doPut(`/comments/${data.id}`, comment);
};


/**** TODO: REVIEW BELOW ****/

/**
 * Get all the posts from the server
 * 
 * @return {Promise} that resolves to an array with all the posts
 */
export const getAll = () => doGet(`/posts`);


/**
 * Get the post with the given id from the server
 * 
 * @param {string} id of the post
 * @return {Promise} that resolves to an object with the post information
 */
export const get = (id) => doGet(`/posts/${id}`);




/**
 * Upvote or downvote a post
 * 
 * @param {string} id of the post
 * @param {string} voteType - upVote or downVote
 * @return {Promise} that resolves to an object with the info of the post that was voted
 */
export const vote = (id, voteType) => doPost(`/posts/${id}`, {option: voteType});

/**
 * Detele a post
 * 
 * @param {string} id of the post
 * @return {Promise} that resolves to an object with the info of the post that was voted
 */
export const deletePost = id => doDelete(`/posts/${id}`);

