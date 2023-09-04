const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title : String,
  description :String,

},{
  timestamps:true
});

const BlogPost = mongoose.model("BlogPost",blogPostSchema);

module.exports = BlogPost;