import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Row,Col,Button} from 'react-bootstrap';
import {Switch, Link, Route, withRouter} from 'react-router-dom';

import ListPosts from './ListPosts';
import PostDetail from './PostDetail';
import AddEditPostModal from './AddEditPostModal';
import ErrorMessage from './ErrorMessage';

import {fetchPosts} from '../actions/posts_actions';
import {fetchCategories} from '../actions/categories_actions';

/**
 * @description  Main App component. It includes the main nav, categories side bar and main view space
 */
class App extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllCategories();
  }

  state = {
    addPostModalOpen: false
  }

  setAddPostModalVisibility = (newState) => ()=>this.setState({addPostModalOpen:newState})
    
  render() {
    const {categories,posts} = this.props;
    return (
      <div className="App">
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <Link to="/" className="navbar-brand">
            READABLE!
          </Link>
          
          <Button 
            className="navbar-add-post" 
            bsStyle="primary"
            onClick={this.setAddPostModalVisibility(true)}
            >Add a post</Button>
        </header>
        <Row>
          <Col xs={12} md={4} lg={2}>
            <h3>Categories</h3>
            <ul>
              {categories.map(category=>(
                <li key={category.path}>
                  <Link to={"/"+category.path}>{category.name}</Link>
                </li>
              ))}
            </ul>

          </Col>
          <Col xs={12} md={8} lg={10}>
            <Switch>
              <Route 
                exact path="/" 
                render={()=><ListPosts posts={posts}/>}
                />

              {categories.map(category=>(
                <Route 
                  key={category.path}
                  exact path={"/"+category.path} 
                  render={()=><ListPosts posts={posts} category={category}/>}
                  />
              ))}

              {categories.map(category=>(
                <Route 
                  key={category.path}
                  path={"/"+category.path+"/:postId"} 
                  render={(props)=><PostDetail postId={props.match.params.postId} categoryInUrl={category.name}/>}
                  />
              ))}

              <Route 
                component={ErrorMessage}
              />
            </Switch>
          </Col>
          
        </Row>

        <AddEditPostModal 
          action="add"
          show={this.state.addPostModalOpen} 
          onHide={this.setAddPostModalVisibility(false)}
          />
      </div>
    );
  }
}

function mapStateToProps({posts, categories}){
  return {
    //show only the posts that haven't been deleted
    posts: posts.filter(post=>!post.deleted),
    categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllPosts: () => dispatch(fetchPosts()),
    getAllCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));