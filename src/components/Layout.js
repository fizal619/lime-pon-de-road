import React, { Component} from 'react';
import { Input, Menu, Image } from 'semantic-ui-react'
import {  Link } from 'react-router-dom';

class Layout extends Component {

  render() {
    const activeItem = this.props.children.props.path;
    console.log('Layout Props', this.props);
    const { login, logout, user, children } = this.props;

    return (
      <div>

        <Menu pointing>
          <Menu.Item name='home' active={activeItem === '/'} onClick={this.handleItemClick} >
            <Link to='/' >Home</Link>
          </Menu.Item>
          <Menu.Menu position='right'>
              {user ?
                <Menu.Item>
                  <Image src={user.photoURL} size="mini" />
                </Menu.Item>
              :
              null
            }
            <Menu.Item
              name={ user ? 'LEFF': 'INSIDE❗' }
              onClick={ user ? logout : login} />
          </Menu.Menu>
        </Menu>

        {children}

      </div>
    );
  }


}

export default Layout;