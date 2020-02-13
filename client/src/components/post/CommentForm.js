import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post.actions';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div className='CommentForm'>
      <div className='bg-info p-2 mb-4'>
        <h3 className='ml-4 text-white'>Leave a Comment</h3>
      </div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <FormGroup>
          <Input
            type='textarea'
            name='text'
            placeholder='Leave a comment'
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};
export default connect(null, { addComment })(CommentForm);
