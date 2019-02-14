import React, { Component} from 'react';
import {connect} from 'react-firebase';
import ReactPlayer from 'react-player'

import firebase from '../firebase.js';

import {
  Segment,
  Card,
  Icon,
  Image,
  Dimmer,
  Container,
  Grid,
  Label,
  Divider,
  Loader,
  Input,
  Button,
  Header,
  Progress
} from 'semantic-ui-react';

class Player extends Component {

  state = {}

  async componentWillReceiveProps(n){
    if (n.room && !this.state.url){
      try {
        //set url
        const url = n.room.filename
        this.setState({url: `${url}#t=${n.room.playerState.currentTime}`});

        // pause the video if I left the page
        if (n.room.playerState.play && n.room.owner === this.props.user.uid){
          this.props.updatePlay(false);
        }

        //add self to the room
        if (!n.room.users.includes(this.props.user.uid)){
          this.props.addSelfToRoom(this.props.user.uid, n.room.users)
        }

      } catch (e) {
        console.log(e);
      }
    }

    if (this.video && !this.isOwner() && n.room && this.props.room) {
      //recieving new time
      const newTime = n.room.playerState.currentTime;
      const oldTime = this.props.room.playerState.currentTime;
      if ((newTime - oldTime > 2) || ( oldTime - newTime > 2)) {
        this.video.currentTime = newTime;
      }

      //playing and pausing
      if(n.room.playerState.play) {
        this.video.play();
      } else {
        this.video.pause();
      }
    }
  }

  isOwner(){
    return this.props.room && this.props.room.owner === this.props.user.uid;
  }

  playerPropsDecider(){
    if (this.isOwner()){
      return {
        onTimeUpdate: ({nativeEvent}) =>{
          if((nativeEvent.target.currentTime - this.props.room.playerState.currentTime > 2) || ( this.props.room.playerState.currentTime - nativeEvent.target.currentTime > 2)) {
            this.props.updateProgress(nativeEvent.target.currentTime);
          }
        },
        onPlay: e => this.props.updatePlay(true),
        onPause: e => this.props.updatePlay(false),
        onCanPlay: ({nativeEvent}) => {
          this.setState({
            video: nativeEvent.target
          });
        }
      }
    } else {
      return {
        onCanPlay: ({nativeEvent}) => {
          this.video = nativeEvent.target;
        }
      }
    }
  }

  toggleFullScreen() {
    if(this.video && this.video.requestFullScreen){
      this.video.requestFullScreen();
    } else if(this.video && this.video.webkitRequestFullScreen){
      this.video.webkitRequestFullScreen();
    } else if(this.video && this.video.mozRequestFullScreen){
      this.video.mozRequestFullScreen();
    }
  }


  render(){


    return (
      <Container >
        <Divider hidden />
        <Grid centered columns={'equal'}>
          <Grid.Row>
            <Header> De TV - {this.props.room ? this.props.room.name : '' } </Header>
          </Grid.Row>
          <Grid.Row>
            <video
              controls={this.isOwner()}
              {...this.playerPropsDecider()}
              src={`${this.state.url}`}
              preload='true'
              width='80%'
              height="500px"
            />
          </Grid.Row>
          <Grid.Row>
            <Button color='teal' onClick={this.toggleFullScreen.bind(this)}> <Icon name='tv'/> Mek it big </Button>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapFirebaseToProps = (props, ref) => {
  if (props.user) {
    return {
      room: `rooms/${props.match.params.id}`,
      updateProgress: time => {
        // console.log(time);
        ref(`rooms/${props.match.params.id}/playerState`).set({
          play: true,
          currentTime: time
        });
      },
      updatePlay: bool => {
        ref(`rooms/${props.match.params.id}/playerState/play`).set(bool);
      },
      addSelfToRoom: (uid, users) => {
        ref(`rooms/${props.match.params.id}/users`).set(users.concat([uid]));
      }
    }
  }
}

export default connect(mapFirebaseToProps)(Player)