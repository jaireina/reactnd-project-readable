import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row,Col,ButtonToolbar,Button} from 'react-bootstrap';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right';

import PostScore from './PostScore';
import EditDeletePostBar from './EditDeletePostBar';
import AddEditCommentModal from  './AddEditCommentModal';

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
            {/* <PostScore voteScore={comment.voteScore} id={post.id} /> */}
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

export default CommentDetail;