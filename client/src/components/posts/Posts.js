import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { getPosts } from '../../actions/post.actions';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner color='primary' />
  ) : (
    <Fragment>
      <h1 className='text-info'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user mr-2'></i>Welcome to the community
      </p>
      <PostForm />
      <div className='Posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const MapStateToProps = state => ({
  post: state.post
});

export default connect(MapStateToProps, { getPosts })(Posts);
