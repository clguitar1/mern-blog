import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    user: { name }
  }
}) => (
  <div className='ProfileAbout bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-info'>{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
