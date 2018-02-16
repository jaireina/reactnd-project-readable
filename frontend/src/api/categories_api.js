import {doGet} from '../util/fetch';

/**
 * Get all the categories from the server
 * 
 * @return {Promise} that resolves to an array with all the posts
 */
export const getAll = () => doGet(`/categories`);