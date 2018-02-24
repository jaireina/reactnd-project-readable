import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {fetchPost, fetchPostComments} from '../actions/posts_actions';

import {Row,Col} from 'react-bootstrap';
import dateformat from 'dateformat';

import PostScore from './PostScore';
import EditDeletePostBar from './EditDeletePostBar';
import ListComments from './ListComments';
import ErrorMessage from './ErrorMessage';


/**
* @description displays the detailed information of a post.
*/
class PostDetail extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired,
    categoryInUrl: PropTypes.string
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

  onEditPost = (post) => {
    alert('The post has been edited');
    this.props.history.replace(`/${post.category}/${post.id}`);
  }
  
  render() {
    const {post,categoryInUrl} = this.props;
    const date = new Date(post.timestamp);

    if(!post.id && !post.error) return <div>Loading</div>;
    
    if(post.error || post.category !== categoryInUrl) return <ErrorMessage />

    return(
      <Col className="post-summary" xs={12}>
        <Row className="post-head">
          <Col xs={12} className="post-title">
            {post.title}
          </Col>
          <Col xs={12} className="post-subtitle">
            <Row>
              <Col xs={12} className="post-author">By {post.author} - {dateformat(date, "mm-dd-yyyy, h:MM:ss TT")}</Col>
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
              onEdit={this.onEditPost}
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
  post.comments = post.comments
                    .filter(comment => !comment.deleted)
                    .sort( (a,b)=> b.timestamp - a.timestamp );
  
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