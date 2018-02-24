import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {requestAddComment, requestEditComment} from '../actions/comments_actions';

import {Button,FormGroup,ControlLabel,FormControl, Modal} from 'react-bootstrap';

/**
 * @description Modal that shows the form to add or edit a comment
 */
class AddEditCommentModal extends Component {
  static propTypes = {
    onCloseRequest: PropTypes.func,
    postId: PropTypes.string.isRequired,
    action: PropTypes.string,
    comment: PropTypes.object
  }

  static defaultProps = {
    action: 'add'
  }

  state = {
    body:'',
    author: '',
    touched: {
      body: false,
      author: false
    },
    isEditing: false,
    modalTitle: 'Add comment',
  }

  getValidationState = (field, ignoreTouchState=false) => {
    const fieldState = this.state[field].trim();
    if(!ignoreTouchState && !this.state.touched[field]) return null;

    switch(field){
      case "body":
      case "author":
        if (fieldState.length === 0) return 'error';
        else if (fieldState.length > 0) return 'success';
        else return null;
      default:
        return null;
    }
  }

  handleChange= (field, e)=> {
    this.setState({ [field]: e.target.value });
  }

  handleBlur = (field) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  resetState = () => {
    this.setState({
      touched: {
        body: false,
        author: false,
      }
    });
  }

  handleModalClose = ()=>{
    this.resetState(); 
    this.props.onHide();
  }

  triggerFieldsBlur = () => {
    this.setState({
      touched: { 'body': true, 'author': true }
    });
  }
  
  handleOnEnter = () => {
    const {action} = this.props;
    if(action==="add") return;
    
    const {body, author} = this.props.comment;
    if(action==="edit"){
      this.setState({isEditing: true, modalTitle: "Edit Comment", body, author})
    };
  }

  formHasErrors = () => {
    const {getValidationState} = this;
    const validationResults = [];
    validationResults.push(getValidationState('body', true));
    validationResults.push(getValidationState('author', true));
    return validationResults.reduce( (prev,next) => (prev || next==="error"), false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.triggerFieldsBlur();

    if(this.formHasErrors()){
      return;
    }
    
    const {author, body} = this.state; 
    
    if(this.state.isEditing){
      const {id} = this.props.comment;
      this.props.submitEditComment({body, id}).then(this.handleModalClose);
    }else{
      const parentId = this.props.postId;
      this.props.submitAddComment({author, body, parentId}).then(this.handleModalClose);
    }
    
    return true;
  }

  render() {
    
    return (
      <Modal
        show={this.props.show}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
        onHide = {this.handleModalClose}
        onEnter = {this.handleOnEnter}
      >
        <form onSubmit={this.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <FormGroup
            controlId="body"
            validationState={this.getValidationState('body')}
          >
            <ControlLabel>Comment*:</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={this.state.body}
              placeholder="Your thoughts here..."
              onChange={(e)=>this.handleChange('body', e)}
              onBlur={()=>this.handleBlur('body')}
            />
          </FormGroup>
          <FormGroup
            controlId="author"
            validationState={this.getValidationState('author')}
          >
            <ControlLabel>Author*:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.author}
              placeholder="Your name here..."
              onChange={(e)=>this.handleChange('author', e)}
              onBlur={()=>this.handleBlur('author')}
              disabled={this.state.isEditing}
            />
          </FormGroup>
        </Modal.Body>
        
        <Modal.Footer>
          <Button bsStyle="primary" type="submit">Submit</Button>
          <Button onClick={this.handleModalClose}>Close</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitAddComment: (comment) => dispatch(requestAddComment(comment)),
    submitEditComment: (comment) => dispatch(requestEditComment(comment))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AddEditCommentModal));