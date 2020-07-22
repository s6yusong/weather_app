import React from 'react';
import { Container } from 'react-bootstrap'



const Layout = (props) => {
  return (
      <div className="app-layout">
        <Container>
          {props.children}
        </Container>
      </div>
  );
}

export default Layout;