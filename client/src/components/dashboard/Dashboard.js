import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount
} from '../../actions/profile.actions';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import { Button } from 'reactstrap';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  // user is from auth.reducer.js
  auth: { user },
  // get profile and loading state from profile.reducer.js
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner color='primary' />
  ) : (
    <Fragment>
      <h1 className='large text-info'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions profile={profile} />

          <div className='my-2'>
            <Button className='btn btn-danger' onClick={() => deleteAccount()}>
              Delete my account
            </Button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet created a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-info'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // state is the global state and auth is declared in rootReducer.js
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
