import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Switch, Link, Route, withRouter} from 'react-router-dom';
import {Row,Col,ButtonToolbar,Button} from 'react-bootstrap';

import {requestPostDeletion} from '../actions/posts_actions';

/**
* @description displays the summary view of a post.
*/
class EditDeletePostBar extends Component {

  static propTypes = {
    post: PropTypes.object,
    onDelete: PropTypes.func
  }

  static defaultProps = {
    post: {},
    onDelete: ()=>{}
  }

  deletePost = (postId)=>{
    this.props.executePostDeletion(postId).then(this.props.onDelete);
  }

  render() {
    const {post} = this.props;
    return(
      <ButtonToolbar>
        <Button bsStyle="primary" bsSize="small">Edit</Button>
        <Button 
          bsStyle="danger" 
          bsSize="small"
          onClick={()=>this.deletePost(post.id)}>Delete</Button>
      </ButtonToolbar>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    executePostDeletion: (postId) => dispatch(requestPostDeletion(postId))
  }
}

export default connect(null, mapDispatchToProps)(EditDeletePostBar);