import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row,Col} from 'react-bootstrap';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right';

import PostScore from './PostScore';
import EditDeletePostBar from './EditDeletePostBar';

/**
* @description displays the summary view of a post.
*/
class PostSummary extends Component {

  static propTypes = {
    post: PropTypes.object
  }

  static defaultProps = {
    post: {}
  }

  render() {
    const {post} = this.props;
    return(
      <Col className="post-summary" xs={12}>
        <Row className="post-head">
          <Col xs={12} className="post-title">
            <Link to={"/posts/"+post.id}>{post.title} <ArrowRightIcon size={15} /> </Link>
            </Col>
          <Col xs={12} className="post-subtitle">
            <Row>
              <Col xs={12} className="post-author">By {post.author}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="post-body">
          <Col xs={8}>
            <PostScore voteScore={post.voteScore} id={post.id} />
          </Col>
          <Col xs={4} className="post-comment-count">
            {post.commentCount} <CommentsIcon size={18}/>
          </Col>
        </Row>
        <Row className="post-actions">
          <Col xs={12}>
            <EditDeletePostBar 
              onDelete={()=>alert('The post has been deleted')}
              post={post}
              />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default PostSummary;