import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ButtonToolbar,Button} from 'react-bootstrap';

import {requestPostDeletion} from '../actions/posts_actions';
import AddEditPostModal from './AddEditPostModal';

/**
* @description Bar with options to Edit and Delete the post 
*/
class EditDeletePostBar extends Component {

  static propTypes = {
    post: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
  }

  static defaultProps = {
    post: {},
    onDelete: ()=>{},
    onEdit: ()=>{}
  }

  state = {
    editPostModalOpen: false
  }

  deletePost = (postId)=>{
    this.props.executePostDeletion(postId).then(this.props.onDelete);
  }

  setEditModalVisibility = (isVisible)=>(
    ()=>this.setState({editPostModalOpen: isVisible})
  )

  handleEditSuccess = (post) => {
    this.props.onEdit(post);
  }
    
  render() {
    const {post} = this.props;
    return(
      <div>
        <ButtonToolbar>
          <Button 
            bsStyle="primary" 
            bsSize="small"
            onClick={this.setEditModalVisibility(true)} >Edit</Button>
          <Button 
            bsStyle="danger" 
            bsSize="small"
            onClick={()=>this.deletePost(post.id)}>Delete</Button>
        </ButtonToolbar>
        <AddEditPostModal 
          action="edit"
          post={post}
          show={this.state.editPostModalOpen}
          onHide={this.setEditModalVisibility(false)}
          onEditSuccess={this.handleEditSuccess} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    executePostDeletion: (postId) => dispatch(requestPostDeletion(postId))
  }
}

export default connect(null, mapDispatchToProps)(EditDeletePostBar);