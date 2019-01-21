import React, { Component} from 'react';
import {connect} from 'react-firebase';

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

class RoomList extends Component {


  async componentDidMount(){

  }



  renderRooms = () => {
    const rooms = [];
    for (let key in this.props.rooms) {
      let room = this.props.rooms[key];
      rooms.push(
        <Card key={key}>
          <Card.Content>
            <Card.Header>{room.name}</Card.Header>
            <Card.Meta>owner</Card.Meta>
            <Card.Description>
              <Icon name="user" /> {room.users.length} people deh watching.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <a href={`/room/${key}`} className='ui basic button green'>
                Open
              </a>
              {room.owner === this.props.user.uid ?
                <Button onClick={()=>this.props.removeRoom(key, room)} basic color='red'>
                  Delete Room
                </Button>
              :
                null
              }
            </div>
          </Card.Content>
        </Card>
      );
    }
    return rooms;
  }



  render(){

    // console.log(this.state)

    return (
      <Container >
        <Divider hidden />
        <Grid centered columns={'equal'}>
          <Grid.Row>
            <Header> Ya'll Rooms Skunt </Header>
          </Grid.Row>
          <Grid.Row>
            <Card.Group>
              {this.renderRooms()}
            </Card.Group>
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
          firebase
            .storage()
            .ref('videos')
            .child(room.filename)
            .delete();
          ref(`rooms/${id}`).remove();
        }
      }
    }
  }
}

export default connect(mapFirebaseToProps)(RoomList)