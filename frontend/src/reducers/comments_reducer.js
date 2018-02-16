import {
  ADD_COMMENT
} from '../actions/comments_actions';

const initialState = [];

function categoriesReducer(state=initialCategoriesState, action){
  switch(action.type){
    
    case RECEIVE_CATEGORIES:
      const {categories} = action.categories; 
      return categories;

    default: 
      return state;
  }
}

export default categoriesReducer;