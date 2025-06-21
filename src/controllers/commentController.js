const { Comment } = require('../models')
const { User } = require('../models');

const getComments = async (req, res) => {
    const data = await Comment.find()
        .populate("postId")
        .populate("nickName");
    res.status(200).json(data);
}

const getCommentById = async (req, res) => {
    const data = await Comment.findById(req.params.id);
    res.status(200).json(data);
}

const createComment = async (req, res) => {
    const user = await User.findOne({ nickName: req.body.nickName });
    if (!user) return res.status(404).json({ error: 'NickName No Encontrado' });
    //Falta chequear si existe el postId
    const newComment = await Comment.create({
        description: req.body.description,
        postId: req.body.postId,
        nickName: user._id,
        fecha: req.body.fecha
    });

    //const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
}

const deleteCommentById = async (req, res) => {
    const data = await Comment.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Comentario No Encontrado' });
    const removed = await data.deleteOne();
    res.status(200).json(removed);
}

const putCommentById = async (req, res) => {
    const { description } = req.body;
    await Comment.updateOne({ _id: req.params.id }, { description, fecha: new Date() });
    //Usar mismo modelo que los otros?
    const data = await Comment.findById(req.params.id);
    res.status(201).json(data);
};

module.exports = { getComments, getCommentById, createComment, deleteCommentById, putCommentById }
