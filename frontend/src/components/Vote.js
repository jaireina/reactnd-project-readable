import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up';
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down';

/**
* @description Used to display the current votes and a mechanism to upvote or downvote
*/
class Vote extends Component {

  static propTypes = {
    voteScore: PropTypes.number,
    onVote: PropTypes.func,
    iconsSize: PropTypes.number
  }

  static defaultProps = {
    iconsSize: 18,
    onVote: () => {}
  }

  handleVote = (voteType) => {
    this.props.onVote(voteType);
  }

  render() {
    const {voteScore, iconsSize} = this.props;
    return(
      <div className="post-score">
        {voteScore} 
        <button onClick={()=>this.handleVote('upVote')}><ThumbsUpIcon size={iconsSize} /></button>
        <button onClick={()=>this.handleVote('downVote')}><ThumbsDownIcon size={iconsSize} /></button>
      </div>
    );
  }
}

export default Vote;