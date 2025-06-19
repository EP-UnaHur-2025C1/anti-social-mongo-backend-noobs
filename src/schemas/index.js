const userSchema = require("./userSchema");
const commentSchema = require("./commentSchema")
const post_imageSchema = require("./post_imageSchema")
const postSchema = require("./postSchema")
const tagSchema = require("./tagSchema")
const postTagSchema = require("./postTagSchema")
const followerSchema = require("./followerSchema")

module.exports = { userSchema, commentSchema, post_imageSchema, postSchema, tagSchema, postTagSchema, followerSchema };