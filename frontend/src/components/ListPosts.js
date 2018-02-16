import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Row,Col,FormGroup,ControlLabel,FormControl,HelpBlock,Form} from 'react-bootstrap';

import PostSummary from './PostSummary';
/**
* @description displays a list of posts of a given category or shows all the posts available (if no category is provided)
*/
class ListPosts extends Component {

  static propTypes = {
    category: PropTypes.object,
    posts: PropTypes.array
  }

  static defaultProps = {
    category: {},
    posts: []
  }

  state = {
    sortBy: 'timestamp'
  }

  handleSortByChange = (e) => {
    const sortBy = e.target.value;
    this.setState({sortBy});
  }

  render() {
    let {posts, category} = this.props;

    const categoryHeadline = category.name ? 
                              <h1>Posts Category: {category.name}</h1>
                              :<h1>All Posts</h1>;

    if(category.name){
      posts = posts.filter(post => post.category === category.name);
    }

    const {sortBy} = this.state;
    posts = posts.sort((a,b) => {
      return b[sortBy] - a[sortBy];
    });

                           
    return(
      <div className="posts-list">
        <Row>
          <Col xs={12} className="posts-list-category">
            {categoryHeadline}
            <span className="posts-lists-count">Showing {posts.length} post(s)</span>
          </Col>
          <Col xs={12} className="posts-sort">
            <form>
              <label>Sort By:&nbsp;</label>
                <select 
                  value={this.state.sortBy}
                  onChange={this.handleSortByChange}>
                  <option value="timestamp">Date</option>
                  <option value="voteScore">Votes</option>
                </select>
            </form>
          </Col>
          <div>
            {posts.map( post => <PostSummary post={post} key={post.id}/> )}
          </div>
        </Row>
      </div>
    );
  }
}

export default ListPosts;