import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar }
  }
}) => {
  return (
    <div className='ProfileItem border border-secondary bg-light container mb-3 text-center'>
      <div className='d-md-flex justify-content-between p-3'>
        <img src={avatar} alt='avatar' className='rounded-circle' />
        <div className='d-flex flex-column justify-content-center'>
          <h2>{name}</h2>

          <Link to={`/profile/${_id}`} className='btn btn-info'>
            View Profile
          </Link>
        </div>
        <ul className='d-flex flex-column justify-content-center'></ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
