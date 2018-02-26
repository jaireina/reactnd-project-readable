import {getAll as getAllCategories} from '../api/categories_api';
import {RECEIVE_CATEGORIES} from './action_types';

/**
 * Creates an action that is used when we're receiving the categories
 * @param {Array} categories
 */
export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
};

/**
 * Connects to the API to retrieve all the existing categories 
 * and dispatches the receiveCategories action once the categories 
 * info is received 
 */
export const fetchCategories = () => dispatch => getAllCategories()
                                                  .then(categories => dispatch(receiveCategories(categories)));