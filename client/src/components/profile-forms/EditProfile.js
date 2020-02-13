import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile
} from '../../actions/profile.actions';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const initialState = {
  username: '',
  bio: ''
};
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      console.log(profile.user);
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { username, bio } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <div className='EditProfile'>
      <h1 className='large text-info'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user mr-2' /> Add some info to your profile
      </p>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type='text'
            name='username'
            minLength='6'
            value={username}
            onChange={onChange}
            placeholder='Username'
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='textarea'
            name='bio'
            minLength='6'
            value={bio}
            onChange={onChange}
            placeholder='A short bio'
          />
          <small>Tell us a little about yourself</small>
        </FormGroup>
        <Button className='btn btn-info my-1'>Submit</Button>
        <Link className='btn btn-light mx-2 my-1' to='/dashboard'>
          Dashboard
        </Link>
      </Form>
    </div>
  );
};
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
