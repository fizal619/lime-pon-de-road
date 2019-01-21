import React, { Component} from 'react';
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
  Button,
  Loader,
  Header
} from 'semantic-ui-react';

export default class Home extends Component {

  async componentDidMount(){

  }


  render(){


    return (
      <Container >
        <Divider hidden />
        <Grid centered columns={'equal'}>
          <Header> Must lawg in fuh use this skunt. </Header>
          <Grid.Row>
            <Button onClick={this.props.login} color='teal'>Inside❗❗❗</Button>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}