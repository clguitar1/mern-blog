import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className='ProfileItem border border-secondary bg-light container mb-3'>
      <div className='d-md-flex justify-content-between p-3'>
        <img src={avatar} alt='avatar' className='rounded-circle' />
        <div className='d-flex flex-column justify-content-center'>
          <h2>{name}</h2>
          <p className='mb-0'>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-1'>{location && <span>{location}</span>}</p>

          <Link to={`/profile/${_id}`} className='btn btn-info'>
            View Profile
          </Link>
        </div>
        <ul className='d-flex flex-column justify-content-center'>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check'>{skill}</i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
