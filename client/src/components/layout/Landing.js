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
    <div className='Landing container'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Blog App</h1>
          <p className='lead'>
            Create a profile, share posts with your friends
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-info mr-2'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
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
