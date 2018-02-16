import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button,FormGroup,ControlLabel,FormControl, Modal} from 'react-bootstrap';

class AddEditCommentModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    onCloseRequest: PropTypes.func
  }

  static defaultProps = {
    title: 'Add comment'
  }

  state = {
    body:'',
    author: '',
    touched: {
      body: false,
      author: false
    }    
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

    console.log(this.state);
    return true;
  }

  render() {
    
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
        onHide = {this.handleModalClose}
      >
        <form onSubmit={this.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
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

export default AddEditCommentModal;