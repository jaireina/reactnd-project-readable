import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Row,Col,ButtonToolbar,Button} from 'react-bootstrap';

import CommentScore from './CommentScore';
import AddEditCommentModal from  './AddEditCommentModal';

import {requestCommentDeletion} from '../actions/comments_actions';

/**
* @description displays the detail view of a comment.
*/
class CommentDetail extends Component {

  static propTypes = {
    comment: PropTypes.object
  }

  static defaultProps = {
    comment: {}
  }

  state = {
    showEditModal: false
  }

  setEditModalState = (modalState)=>{
    this.setState({showEditModal: modalState});
  }

  handlePostDeletion = ()=>{
    this.props.executeCommentDeletion(this.props.comment.id).then(()=>alert('Comment deleted'));
  }

  render() {
    const {comment} = this.props;

    return(
      <Col className="comment-detail" xs={12}>
        <Row className="comment-head">
          <Col xs={12} className="comment-subtitle">
            <Row>
              <Col xs={12} className="comment-author">By {comment.author}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="comment-body">
          <Col xs={12} className="comment-content">
            {comment.body}
          </Col>          
          <Col xs={8}>
            <CommentScore 
              id={comment.id}
              voteScore={comment.voteScore} 
              />
          </Col>
        </Row>
        <Row className="comment-actions">
          <Col xs={12}>
          <ButtonToolbar>
            <Button 
              bsStyle="primary" 
              bsSize="xsmall"
              onClick={()=>this.setEditModalState(true)}
              > Edit</Button>
            <Button 
              bsStyle="danger" 
              bsSize="xsmall"
              onClick={this.handlePostDeletion}
              >Delete</Button>
          </ButtonToolbar>
          </Col>
        </Row>

        <AddEditCommentModal
          show={this.state.showEditModal}
          onHide={()=>this.setEditModalState(false)}
          postId={comment.parentId}
          action="edit"
          comment={comment}
          />
      </Col>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    executeCommentDeletion: (postId) => dispatch(requestCommentDeletion(postId))
  }
}

export default connect(null, mapDispatchToProps)(CommentDetail);