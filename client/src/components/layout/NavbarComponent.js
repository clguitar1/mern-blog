import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.actions';

const NavbarComponent = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Nav className='ml-auto mr-4' navbar>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/profiles'>
          Developer Profiles
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/posts'>
          Posts
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/dashboard'>
          <i className='fas fa-user'></i> Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={logout} tag={RRNavLink} exact to='/#!'>
          <i className='fas fa-sign-out-alt mr-1'></i>Logout
        </NavLink>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className='ml-auto mr-4' navbar>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/profiles'>
          Developer Profiles
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/register'>
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/login'>
          Login
        </NavLink>
      </NavItem>
    </Nav>
  );

  return (
    <div>
      <Navbar className='border-bottom' color='dark' dark expand='md'>
        <NavbarBrand className='ml-4' href='/'>
          <i className='fas fa-code mr-2'></i>Blog App
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

NavbarComponent.propTypes = {
  dark: PropTypes.bool,
  color: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

NavbarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // state is the global state and auth is declared in rootReducer.js
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarComponent);
