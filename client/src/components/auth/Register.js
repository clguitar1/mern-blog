import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert.actions';
import { register } from '../../actions/auth.actions';
import PropTypes from 'prop-types';

const Register = ({ isAuthenticated, setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      // call setAlert(msg, alertType) in alert.actions.js
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='Register-form'>
      <h1 className='text-info'>Sign Up</h1>
      <p>
        <i className='fas fa-user mr-2'></i>Create Your Account
      </p>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Name'
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Password'
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={onChange}
            placeholder='Confirm Password'
          />
        </FormGroup>
        <Button className='btn btn-info' type='submit'>
          Submit
        </Button>
      </Form>
      <p className='mt-2'>
        Already have an account?{' '}
        <Link to='/login' className='text-info'>
          Sign In
        </Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
