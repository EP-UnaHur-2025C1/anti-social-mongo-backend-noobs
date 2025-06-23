const { Comment, Post, User } = require('../models')

const getComments = async (_, res) => {
    try {
        const data = await Comment.find()
            .populate({
                path: 'postId',
                select: ['_id']
            })
            .populate({
                path: 'user',
                select: ['nickName']
            })
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCommentById = async (req, res) => {
    try {
        const idComt = req.params.id
        const comment = await Comment.findById(idComt);
        if (!comment) return res.status(404).json({ error: 'Comentario No Encontrada' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createComment = async (req, res) => {
    try {
        const name = req.body.nickName
        const idPost = req.body.postId

        const user = await User.findOne({ nickName: name });
        const post = await Post.findById(idPost);

        if (!user) return res.status(404).json({ error: 'NickName No Encontrado' });
        if (!post) return res.status(404).json({ error: 'Post No Encontrado' });

        const newComment = new Comment({
            description: req.body.description,
            postId: idPost,
            user: user._id,
            fecha: req.body.fecha
        });
        await newComment.save()
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCommentById = async (req, res) => {
    try {
        const idComt = req.params.id
        const comment = await Comment.findByIdAndDelete(idComt);

        if (!comment) return res.status(404).json({ error: 'Comentario No Encontrado' });

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putCommentById = async (req, res) => {
    try {
        const { description } = req.body;
        const idC = req.params.id
        const comment = await Comment.findByIdAndUpdate(
            idC,
            { description, fecha: new Date() },
            { new: true })
        if (!comment) return res.status(404).json({ error: 'Comentario No Encontrado' });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getComments, getCommentById, createComment, deleteCommentById, putCommentById }
