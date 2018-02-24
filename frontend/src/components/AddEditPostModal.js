import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {Button,FormGroup,ControlLabel,FormControl, Modal} from 'react-bootstrap';

import {requestAddPost, requestEditPost} from '../actions/posts_actions';

/**
 * @description Modal that shows the form to add or edit a post
 */
class AddEditPostModal extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    post: PropTypes.object,
    onHide: PropTypes.func,
    show: PropTypes.bool,
    onEditSuccess: PropTypes.func
  }

  static defaultProps = {
    action: 'add',
    show: false,
    onHide: () => {},
    onEditSuccess: () => {}
  }

  state = {
    title:'',
    author: '',
    body: '',
    category: '',
    touched: {
      title: false,
      author: false,
      body: false,
      category: false
    },
    isEditing: false,
    modalTitle: 'Add post',
  }

  getValidationState = (field, ignoreTouchState=false) => {
    const fieldState = this.state[field].trim();
    if(!ignoreTouchState && !this.state.touched[field]) return null;

    switch(field){
      case "body":
      case "author":
      case "title":
      case "category":
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
      touched: this.setFieldsTouchState(false)
    });
  }

  setFieldsTouchState = (touched) =>{
    return {
      title: touched,
      author: touched,
      body: touched,
      category: touched
    }
  }

  handleModalClose = ()=>{
    this.resetState(); 
    this.props.onHide();
  }

  triggerFieldsBlur = () => {
    this.setState({
      touched: this.setFieldsTouchState(true)
    });
  }
  
  handleOnEnter = () => {
    const {action, categories} = this.props;
    this.setState({category: categories[0].name});
    
    if(action==="add") return;
    
    const {title, author, body, category} = this.props.post;
    if(action==="edit"){
      this.setState({isEditing: true, modalTitle: "Edit Post", title, author, body, category})
    };
  }

  formHasErrors = () => {
    const {getValidationState} = this;
    const validationResults = [];
    validationResults.push(getValidationState('author', true));
    validationResults.push(getValidationState('body', true));
    validationResults.push(getValidationState('category', true));
    validationResults.push(getValidationState('title', true));
    return validationResults.reduce( (prev,next) => (prev || next==="error"), false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.triggerFieldsBlur();

    if(this.formHasErrors()){
      return;
    }
    
    const {title, author, body, category} = this.state;

    if(this.state.isEditing){
      const {id} = this.props.post;
      const editedDate = {body, title, author, category, id};
      this.props
        .submitEditPost(editedDate)
        .then(({post})=>{
          this.handleModalClose();
          this.props.onEditSuccess(post);
        });
        
    }else{
      this.props
        .submitAddPost({body, title, author, category})
        .then(()=>alert('Post successfully added'))
        .then(this.handleModalClose);
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
            controlId="title"
            validationState={this.getValidationState('title')}
          >
            <ControlLabel>Title*:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              placeholder="Title..."
              onChange={(e)=>this.handleChange('title', e)}
              onBlur={()=>this.handleBlur('title')}
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
            />
          </FormGroup>
          <FormGroup
            controlId="body"
            validationState={this.getValidationState('body')}
          >
            <ControlLabel>Body*:</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={this.state.body}
              placeholder="Your thoughts here..."
              onChange={(e)=>this.handleChange('body', e)}
              onBlur={()=>this.handleBlur('body')}
            />
          </FormGroup>
          <FormGroup
            controlId="category"
            validationState={this.getValidationState('category')}
          >
            <ControlLabel>Category*:</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.category}
              placeholder="Category"
              onChange={(e)=>this.handleChange('category', e)}
              onBlur={()=>this.handleBlur('category')}
            >
              {this.props.categories.map(category => (
                <option value={category.name} key={category.name}>{category.name}</option>
              ))}
              
            </FormControl>
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

function mapStateToProps({categories}){
  return {categories};
}

function mapDispatchToProps(dispatch){
  return {
    submitAddPost: post => dispatch(requestAddPost(post)),
    submitEditPost: post => dispatch(requestEditPost(post))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditPostModal));