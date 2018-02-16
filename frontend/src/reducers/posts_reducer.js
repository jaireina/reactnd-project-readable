import {
  ADD_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  EDIT_POSTS,
  VOTE_POST,
  RECEIVE_POST_DETAIL
} from '../actions/posts_actions';

const initialPostsState = [];

/**
 * Get the index of a given post inside the post list
 * @param {Array} posts list
 * @param {Object} post to find
 */
function getPostIndex (posts, post){
  return posts.findIndex(p => p.id === post.id);
}

/**
 * Replaces the given post in the posts list (if found using its index)
 * @param {Array} posts list
 * @param {Object} post to be replaced in the list and that contains the new data
 */
function replacePostInList(posts, post){
  const postIndex = getPostIndex(posts,post);
  const updatedPostsList = [...posts];
  if(postIndex>=0){
    updatedPostsList[postIndex] = post;
  }
  return updatedPostsList; 
}

function postsReducer(postsState=initialPostsState, action){
  
  switch(action.type){
    
    case RECEIVE_POSTS:
      const {posts} = action;
      return posts;
      
    case DELETE_POST:
      return replacePostInList(postsState, action.post);;

    case VOTE_POST:
      return replacePostInList(postsState, action.post);

    case RECEIVE_POST_DETAIL:
      return replacePostInList(postsState, action.post);

    default: 
      return postsState;
  }
}

export default postsReducer;