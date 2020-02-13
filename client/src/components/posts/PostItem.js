import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { addLike, removeLike, deletePost } from '../../actions/post.actions';
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  return (
    <div className='PostItem container'>
      <div className='row border border-secondary mb-4 p-4 d-flex align-items-center'>
        <div className='PostItem-avatar col-md-4 text-center'>
          <Link to={`/profile/${user}`}>
            <img
              className='PostItem-avatar__img rounded-circle'
              src={avatar}
              alt='avatar'
            />
            <h4 className='text-info'>{name}</h4>
          </Link>
        </div>
        <div className='PostItem-content col-md-8'>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <Button
                onClick={e => addLike(_id)}
                color='secondary'
                className='mr-2'
              >
                <i className='fas fa-thumbs-up mr-1'></i>
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </Button>
              <Button
                onClick={() => removeLike(_id)}
                color='secondary'
                className='mr-2'
              >
                <i className='fas fa-thumbs-down mr-1'></i>
              </Button>
              <Link to={`/posts/${_id}`} className='btn btn-info mr-2'>
                Discussion
                {comments.length > 0 && (
                  <span className='bg-white rounded text-info px-1 ml-2'>
                    {comments.length}
                  </span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <Button onClick={() => deletePost(_id)} color='danger'>
                  <i className='fas fa-times'></i>
                </Button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
