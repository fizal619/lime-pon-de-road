import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import {connect} from 'react-firebase';
import Layout from './components/Layout';
import Home from './components/Home';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      user: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
    }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  handleSearchChange(e) {
    console.log(e.target.value);
    this.setState({
      term: e.target.value
    });
  }

  render() {

    console.log('APP Props', this.props);

    return (
      <BrowserRouter>
        <div>
          <Layout 
            user={this.state.user}            
            login={this.login.bind(this)}
            logout={this.logout.bind(this)}>
            <Route  
              exact 
              path='/' 
              render={props=><Home {...props} />}/>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapFirebaseToProps = (props, ref) => ({
  test: 'test'
});

export default connect(mapFirebaseToProps)(App)

