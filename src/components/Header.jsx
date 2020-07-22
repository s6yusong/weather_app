import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'
import Badge from '@material-ui/core/Badge';
import {Navbar, Nav} from 'react-bootstrap'
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand{
    color: #bbb;
  }
  .MuiBadge-anchorOriginTopRightRectangle {
    top: 6px;
  }
  .navbar-nav a {
    color: #bbb;
    &:hover {
      color: white;
    }
    display: block;
    padding: .5rem 1rem;
  }
  
`;

const Header = () => {
  const postionsNumber = useSelector(state => state.positions.length);
  useEffect(() => {
  }, [postionsNumber]);
  return (
      <>
        <Styles>
          <Navbar expand="lg">
            <Navbar.Brand href="/">Weather App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <Link to='/'>
                    Home
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Badge badgeContent={postionsNumber} color="primary">
                    <Link to='/weather'>
                      Weather
                    </Link>
                  </Badge>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Styles>
      </>
  );
}

export default Header;