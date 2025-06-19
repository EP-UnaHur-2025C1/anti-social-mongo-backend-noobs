const mongoose = require('mongoose');
const postImageSchema = require('../../schemas/post_imageSchema');

const Post_Image = mongoose.model('Post_Image', postImageSchema);

module.exports = Post_Image;
