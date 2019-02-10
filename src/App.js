import React, { Component } from 'react';
import { auth, provider } from './firebase.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-firebase';
import Layout from './components/Layout';
import Home from './components/Home';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import UserHome from './components/UserHome.js';
import Player from './components/Player.js';


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
        this.props.setUserObject({
          uid: user.uid,
          email: user.email,
          avatar: user.photoURL
        })
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

  render() {

    // console.log('APP Props', this.props);

    return (
      <BrowserRouter>
        <div>
          <Layout
            user={this.state.user}
            login={this.login.bind(this)}
            logout={this.logout.bind(this)}>

            {this.state.user ?
              <Switch>
                <Route
                  exact
                  path='/room/:id'
                  render={props=><Player {...props } user={this.state.user} />}
                />
                <Route
                  exact
                  path='/'
                  render={props=><UserHome {...props } user={this.state.user} />}
                />
              </Switch>
            :
              <Route
                exact
                path='/'
                render={props=><Home {...props} login={this.login.bind(this)} />}/>
            }
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapFirebaseToProps = (props, ref) => ({
  setUserObject: user => {
    ref('users').child(user.uid).set(user);
  }
});

export default connect(mapFirebaseToProps)(App)

