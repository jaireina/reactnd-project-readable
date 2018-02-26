import {
  ADD_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  VOTE_POST,
  RECEIVE_POST_DETAIL,
  EDIT_POST,
  DELETE_COMMENT,
  ADD_COMMENT
} from '../actions/action_types';

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

    case ADD_POST:
      const {post} = action;
      const newState = [...postsState];
      newState.push(post);
      return newState;
    
    case EDIT_POST:
    case DELETE_POST:
    case VOTE_POST:
    case RECEIVE_POST_DETAIL:
      return replacePostInList(postsState, action.post);

    case DELETE_COMMENT:
      const postId = action.comment.parentId;
      const postOwner = postsState.find(post=>post.id === postId);
      postOwner.commentCount--;
      return replacePostInList(postsState, postOwner);
    
    case ADD_COMMENT:
      const postID = action.comment.parentId;
      const postEdited = postsState.find(post=>post.id === postID);
      postEdited.commentCount++;
      return replacePostInList(postsState, postEdited);

    default: 
      return postsState;
  }
}

export default postsReducer;