import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal from 'react-modal';
import {Row,Col,ButtonToolbar,Button} from 'react-bootstrap';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right';

import PostScore from './PostScore';

/**
* @description displays the summary view of a post.
*/
class AddEditPostModal extends Component {

  static propTypes = {
    post: PropTypes.object,
    action: PropTypes.string.isRequired
  }

  static defaultProps = {
    post: {}
  }

  closeAddPostModal = ()=>{
    this.setState({addPostModalOpen:false});
  }

  render() {
    const {post} = this.props;
    return(
      <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          ariaHideApp={false}
          contentLabel="Add new post"
        >
          <h2>Ola</h2>
        </Modal>
    );
  }
}

export default AddEditPostModal;