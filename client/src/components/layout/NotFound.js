import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <div>
      <Fragment>
        <h1 className='text-center text-info'>
          <i className='text-info fas fa-exclamation-triangle mr-2'></i>Page Not
          Found
        </h1>
        <p className='text-center'>Page does not exist</p>
      </Fragment>
    </div>
  );
};

export default NotFound;
