import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {sendVote} from '../actions/comments_actions';

import Vote from './Vote';

/**
* @description Used to display the current votes of a comment and the mechanism to upvote or downvote it
*/
class CommentScore extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    voteScore: PropTypes.number
  }

  handleOnVote = (voteType)=>{
    this.props.sendCommentVote(this.props.id, voteType);
  }

  render() {
    return(
      <Vote 
        onVote={this.handleOnVote}
        voteScore={this.props.voteScore}
        iconsSize={14}
      />
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    sendCommentVote: (commentId, voteType) => dispatch(sendVote(commentId, voteType))
  }
}

export default connect(null, mapDispatchToProps)(CommentScore);

