import {
  RECEIVE_CATEGORIES
} from '../actions/categories_actions';

const initialCategoriesState = [];

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