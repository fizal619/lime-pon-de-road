import React, { Component} from 'react';
import {connect} from 'react-firebase';

import firebase from '../firebase.js';

import {
  Card,
  Icon,
  Container,
  Grid,
  Label,
  Divider,
  Button,
  Header,
} from 'semantic-ui-react';

class RoomList extends Component {


  async componentDidMount(){

  }



  renderRooms =  () => {
    const rooms = [];

    //don't render if not ready
    if (!this.props.users || !this.props.rooms) return null;

    for (let key in this.props.rooms) {
      let room = this.props.rooms[key];
      // console.log(this.props.users[room.owner]);
      rooms.push(
        <Card key={key}>
          <Card.Content>
            <Card.Header>{room.name}</Card.Header>
            <Card.Description>
              <Icon name="user" /> {room.users.length} people deh watching.
              <br />
              {room.users.map(uid => {
                    return <Label key={key+uid} image>
                            <img src={this.props.users[uid].avatar} />
                            {this.props.users[uid].email.split('@')[0]}
                          </Label>
              })}
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
      users: 'users',
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

export default connect(mapFirebaseToProps)(RoomList)