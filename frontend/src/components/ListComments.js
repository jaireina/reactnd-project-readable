import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Row,Col,FormGroup,ControlLabel,FormControl,Form, Button} from 'react-bootstrap';
import CommentsIcon from 'react-icons/lib/fa/comments-o';

import CommentDetail from './CommentDetail';
import AddEditCommentModal from './AddEditCommentModal';


/**
* @description displays a list of all the comments of a given post
*/
class ListComments extends Component {

  static propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.string.isRequired
  }

  static defaultProps = {
    comments: []
  }

  state = {
    showAddCommentModal: false
  }

  setAddCommentModalState = (modalState) =>{
    this.setState({showAddCommentModal:modalState});
  }

  render() {
    let {comments} = this.props;
    
    return(
      <Row className="comments-list">
        <Col xs={12} className="comments-list-title">
          COMMENTS: {comments.length} <CommentsIcon size={18}/>   
          <Button 
            bsStyle="success" 
            style={{float:'right'}}
            bsSize="small"
            onClick={()=>this.setAddCommentModalState(true)}>Add a comment</Button>
        </Col>
        
        {comments.map( comment => <CommentDetail comment={comment} key={comment.id}/> )}
         
         
        <AddEditCommentModal
          show={this.state.showAddCommentModal}
          onHide={()=>this.setAddCommentModalState(false)}
          postId={this.props.postId}
          />
            
      </Row>
    );
  }
}

export default ListComments;