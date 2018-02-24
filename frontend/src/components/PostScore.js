import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {sendVote} from '../actions/posts_actions';

import Vote from './Vote';

/**
* @description Used to display the current votes of a post and a mechanism to upvote or downvote the it
*/
class PostScore extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    voteScore: PropTypes.number
  }

  handleOnVote = (voteType)=>{
    this.props.sendPostVote(this.props.id, voteType);
  }

  render() {
    return(
      <Vote 
        onVote={this.handleOnVote}
        voteScore={this.props.voteScore}
      />
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    sendPostVote: (postId, voteType) => dispatch(sendVote(postId, voteType))
  }
}

export default connect(null, mapDispatchToProps)(PostScore);

