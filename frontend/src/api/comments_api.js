import uuidv4 from 'uuid/v4';
import {doPost, doDelete, doPut} from '../util/fetch';

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

/**
 * Delete a comment
 * 
 * @param {string} id of the comment
 * @return {Promise} that resolves to an object with the info of the comment that was deleted
 */
export const deleteComment = id => doDelete(`/comments/${id}`);

/**
 * Upvote or downvote a comment
 * 
 * @param {string} id of the comment
 * @param {string} voteType - upVote or downVote
 * @return {Promise} that resolves to an object with the info of the comment that was voted
 */
export const vote = (id, voteType) => doPost(`/comments/${id}`, {option: voteType});


