import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated, user }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  console.log('the user is: ' + user);
  return (
    <div className='Landing'>
      <div className='Landing-inner p-4'>
        <div className='Landing-secondary-inner text-center'>
          <h1 className='x-large'>Welcome to Blog App</h1>
          <p className='lead'>
            Create a profile, share posts with your friends
          </p>
          <div className='Landing-buttons'>
            <Link to='/login' className='btn btn-light btn-block'>
              Login
            </Link>
            <Link to='/register' className='btn btn-info  btn-block'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.proptTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  // state is the global state and state.isAuthenticated is in auth.reducer.js
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(Landing);
