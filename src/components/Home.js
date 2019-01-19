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
  Loader, 
  Header
} from 'semantic-ui-react';
const api = 'https://wt-89cfc50bad1f3bc752f0a463b2877bb0-0.run.webtask.io/sheets';
export default class Home extends Component {

  async componentDidMount(){

  }


  render(){
   
    
    return (
      <Container >
        <Grid relaxed columns={'equal'}>
          <Divider hidden />
          <Header> Home :) </Header>
        </Grid>
      </Container>
    )
  }
}