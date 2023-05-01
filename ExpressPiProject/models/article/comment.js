const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;






