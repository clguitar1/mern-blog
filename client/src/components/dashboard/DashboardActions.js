import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({
  profile: {
    user: { _id }
  }
}) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light mr-2'>
        <i className='fas fa-user-circle text-info'></i> Edit Profile
      </Link>
      <Link to={`/profile/${_id}`} className='btn btn-info'>
        View Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
