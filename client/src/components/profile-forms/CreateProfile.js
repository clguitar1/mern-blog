import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { createProfile } from '../../actions/profile.actions';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    username: '',
    bio: ''
  });

  const { username, bio } = formData;

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='Register-form mb-5'>
      <h1 className='text-info'>Create Your Profile</h1>
      <p>
        <i className='fas fa-user mr-2'></i>Let's get some information to make
        your profile stand out
      </p>
      <small>* = required field</small>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            placeholder='Create a Username'
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='textarea'
            name='bio'
            value={bio}
            onChange={onChange}
            placeholder='A short bio'
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </FormGroup>

        <div className='mt-3'>
          <Button className='btn btn-info' type='submit'>
            Submit
          </Button>
          <Link to='/dashboard' className='btn btn-light ml-3'>
            Go Back
          </Link>
        </div>
      </Form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
