import React, { Component} from 'react';
import FileUploader from "react-firebase-file-uploader";
import {connect} from 'react-firebase';

import firebase from '../firebase.js';

import {
  Icon,
  Container,
  Grid,
  Divider,
  Input,
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
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress, task) => {
    this.setState({ progress });
  }
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.props.addRoom(this.state.name, {
      name: this.state.name,
      filename: filename,
      owner: this.props.user.uid,
      users: [this.props.user.uid],
      playerState: {
        play: false,
        currentTime: 0
      }
    })
    this.setState({ filename: '', progress: 0, isUploading: false, name: ''});
    firebase
      .storage()
      .ref('videos')
      .child(filename)
      .getDownloadURL()
      .then(url => console.log(url));
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
              {
                this.state.isUploading
                ?
                  <Progress value={Math.ceil(this.state.progress)} success total='100' progress='percent' />
                :
                  <Progress className="hidden" value={0} success total='100' progress='percent' />
              }
              <Input
                label="Wah fuh call it?"
                name="name"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
              <label className="ui label large">
                <Icon name='cloud upload' /> {this.state.filename ? `Uploading ${this.state.filename}` : 'Pick wan file'}
                  <FileUploader
                    hidden
                    accept="video/*"
                    name="video"
                    randomizeFilename
                    storageRef={firebase.storage().ref('videos')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />

              </label>

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