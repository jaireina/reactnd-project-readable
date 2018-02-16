import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Row,Col,Button} from 'react-bootstrap';
import {Switch, Link, Route, withRouter} from 'react-router-dom';


import ListPosts from './ListPosts';
import PostDetail from './PostDetail';
import AddEditPostModal from './AddEditPostModal';
// import {add} from '../api/posts_api';

import {fetchPosts} from '../actions/posts_actions';
import {fetchCategories} from '../actions/categories_actions';


// for(let i = 0; i<10; i++){
//   add({timestamp:Date.now(),title:`post ${i}`,body:`BODYE HERE ${i}`, category: i%3?'redux':i%2?"react":"udacity"})
//   // .then(console.log)
//   // .then(()=>POSTS_API.getAll().then(console.log));
// }



class App extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllCategories();
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
  }

  state = {
    addPostModalOpen: false
  }

  setAddPostModalVisibility = (newState = true)=>{
    this.setState({addPostModalOpen:newState});
  }

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
            onClick={this.setAddPostModalVisibility}
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

              <Route 
                path="/posts/:postId" 
                render={(props)=> <PostDetail postId={props.match.params.postId}/> }
              />

              {categories.map(category=>(
                <Route 
                  key={category.path}
                  exact path={"/"+category.path} 
                  render={()=><ListPosts posts={posts} category={category}/>}
                  />
              ))}
            </Switch>
          </Col>
          
        </Row>

        <AddEditPostModal 
          isOpen={this.state.addPostModalOpen} 
          onRequestClose={()=>this.setAddPostModalVisibility(false)}
          action="add" />
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
