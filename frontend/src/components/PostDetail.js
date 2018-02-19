import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {fetchPost, fetchPostComments} from '../actions/posts_actions';

import {Row,Col,ButtonToolbar,Button} from 'react-bootstrap';
import CommentsIcon from 'react-icons/lib/fa/comments-o';

import PostScore from './PostScore';
import EditDeletePostBar from './EditDeletePostBar';
import ListComments from './ListComments';

import current_post_reducer from '../reducers/current_post_reducer';

/**
* @description displays the summary view of a post.
*/
class PostDetail extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentDidMount(){
    this.props
      .getPostData(this.props.postId)
      .then(this.props.getPostComments(this.props.postId));
  }

  onDeletePost = () => {
    alert('The post has been deleted');
    this.props.history.replace('/');
  }
  
  render() {
    const {post} = this.props;
    
    if(!post.id) return <div>Loading</div>;
    
    return(
      <Col className="post-summary" xs={12}>
        <Row className="post-head">
          <Col xs={12} className="post-title">
            {post.title}
          </Col>
          <Col xs={12} className="post-subtitle">
            <Row>
              <Col xs={12} className="post-author">By {post.author}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="post-body">
          <Col xs={12} className="post-content">
            {post.body}
          </Col>          
          <Col xs={12} className="post-category">
            Category: {post.category}
          </Col>
          <Col xs={12}>
            <PostScore voteScore={post.voteScore} id={post.id} />
          </Col>
        </Row>
        <Row className="post-actions">
          <Col xs={12}>
            <EditDeletePostBar 
              onDelete={this.onDeletePost}
              post={post}
              />
          </Col>
        </Row>
        <Col xs={12} className="post-comments-container">
          <ListComments 
            postId={post.id} 
            comments={post.comments}/>  
        </Col>
        
      </Col>
    );
  }
}

function mapStateToProps({currentPost,comments}){
  const post = {...currentPost};
  post.comments = comments[post.id] ? comments[post.id]: [];
  post.comments = post.comments.sort( (a,b)=> b.timestamp - a.timestamp );
  
  return {
    post
  };
}

function mapDispatchToProps(dispatch){
  return {
    getPostData: (postId) => dispatch(fetchPost(postId)),
    getPostComments: (postId) => dispatch(fetchPostComments(postId))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));