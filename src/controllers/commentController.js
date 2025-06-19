const { Comment } = require('../db/models')

const getComments = async (req, res) => {
    const data = await Comment.find()
    //.populate("post")
    //.populate("usuario");
    res.status(200).json(data);
}

const getCommentById = async (req, res) => {
    const data = await Comment.findById(req.params.id);
    res.status(200).json(data);
}

const createComment = async (req, res) => {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
}

const deleteCommentById = async (req, res) => {
    const data = await Comment.findById(req.params.id);
    const removed = await data.remove();
    res.status(200).json(removed);
}

const putCommentById = async (req, res) => {
    const { description } = req.body;
    await Comment.updateOne({ _id: req.params.id }, { description, fecha: new Date() });
    const data = await Comment.findById(req.params.id);
    res.status(201).json(data);
};

module.exports = { getComments, getCommentById, createComment, deleteCommentById, putCommentById }
