const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type:
      // The ref is connecting User to the Profile through internal model linking. The name is the same as the name being exported from the user model i.e. model('User',UserSchema). Also, MongoDB automatically makes the models plural
      Schema.Types.ObjectId,
    ref: 'User'
  },
  bio: {
    type: String
  },
  username: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
