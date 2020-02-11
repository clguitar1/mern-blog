import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth.actions';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='Login-form'>
      <h1 className='text-info'>Login</h1>
      <p>
        <i className='fas fa-user mr-2'></i>Log in to your account
      </p>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email'
          />
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
        <Button className='btn btn-info' type='submit'>
          Submit
        </Button>
      </Form>
      <p className='mt-2'>
        Need an account?{' '}
        <Link to='/register' className='text-info'>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
