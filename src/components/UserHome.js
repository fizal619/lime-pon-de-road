import React, { Component} from 'react';
import FileUploadProgress  from 'react-fileupload-progress';
import FileUploader from "react-firebase-file-uploader";
import {connect} from 'react-firebase';

import firebase from '../firebase.js';

import {
  Icon,
  Container,
  Grid,
  Divider,
  Input,
  Button,
  Header,
  Progress
} from 'semantic-ui-react';
import RoomList from './RoomList.js';

class UserHome extends Component {

  state = {
    name: '',
    filename: '',
    isUploading: false,
    progress: 0
  };

  async componentDidMount(){

  }

  handleChangeName = event =>
    this.setState({ name: event.target.value });
  handleChangeFilename = event =>
    this.setState({ filename: event.target.value });

  handleSubmit = (e) => {
    this.props.addRoom(this.state.name, {
      name: this.state.name,
      filename: this.state.filename,
      owner: this.props.user.uid,
      users: [this.props.user.uid],
      watching: ['keep'],
      playerState: {
        play: false,
        currentTime: 0
      }
    })
    this.setState({ filename: '', progress: 0, isUploading: false, name: ''});

  };



  render(){

    // console.log(this.state)

    return (
      <Container >
        <Divider hidden />
        <Grid centered columns={'equal'}>
          <Grid.Row>
            <Header> Upload ah flim fuh see</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input
                label="Wah fuh call it?"
                name="name"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </Grid.Column>
            <Grid.Column>
               <Input
                label="Ah direct link tuh it?"
                name="filename"
                value={this.state.filename}
                onChange={this.handleChangeFilename}
              />
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.handleSubmit}>Create</Button>
              <br />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <RoomList user={this.props.user} />
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapFirebaseToProps = (props, ref) => {
  if (props.user) {
    return {
      rooms: 'rooms',
      addRoom: (roomName, roomData) => {
        const key = ref().child('posts').push().key;
        ref(`rooms/${key}`).set(roomData);
      },
      removeRoom: (id, room) => {
        if (props.user.uid === room.owner) {
          ref(`rooms/${id}`).remove();
        }
      }
    }
  }
}

export default connect(mapFirebaseToProps)(UserHome)