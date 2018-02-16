import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {sendVote} from '../actions/posts_actions';

import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up';
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down';



/**
* @description Used to display the current votes of a post and to upvote or downvote the post
*/
class PostScore extends Component {

  static propTypes = {
    id: PropTypes.string,
    voteScore: PropTypes.number
  }

  render() {
    const {voteScore, id, sendPostVote} = this.props;
    return(
      <div className="post-score">
        {voteScore} 
        <button onClick={()=>sendPostVote(id,'upVote')}><ThumbsUpIcon size={18} /></button>
        <button onClick={()=>sendPostVote(id,'downVote')}><ThumbsDownIcon size={18} /></button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    sendPostVote: (postId, voteType) => dispatch(sendVote(postId, voteType))
  }
}

export default connect(null, mapDispatchToProps)(PostScore);

