import {combineReducers} from 'redux';
import posts from './posts_reducer';
import currentPost from './current_post_reducer';
import categories from './categories_reducer';

export default combineReducers({posts, currentPost, categories});