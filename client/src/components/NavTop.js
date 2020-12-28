import React from 'react'
import { Navbar, Nav } from 'rsuite';
import { Link } from "react-router-dom";

const MyLink = React.forwardRef((props, ref) => {
  const { to, as, ...rest } = props;
  return (
    <Link to={to} as={as} {...rest}/> 
  );
});
const NavLink = props => <Nav.Item componentClass={MyLink} {...props} />;

const NavTop = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <h2>LOGO HERE</h2>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <NavLink to="/">List</NavLink>
        </Nav>
        <Nav>
          <NavLink to="/form"> Form </NavLink>
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}
export default NavTop