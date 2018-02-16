import {doGet, doPost, doDelete} from '../util/fetch';

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
 * Add a new post with the given data
 * 
 * @param {object} data of the post to be created
 * @return {Promise} that resolves to an object with the post information
 */
export const add = (data) => {
  
  let post = {id: uuidv4(), ...data};

  return doPost(`/posts`, post);
};

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

