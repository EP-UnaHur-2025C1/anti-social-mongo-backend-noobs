const { Post } = require('../db/models');
const { Post_Image } = require('../db/models');

const getPosts = async (req, res) => {
    const data = await Post.find()
        //.populate("nickName")
        //.populate("imagenes")
        //.populate("tags");
    res.status(200).json(data);
};

const getPostById = async (req, res) => {
    const data = await Post.findById(req.params.id)
        .populate("comentarios")
        .populate("imagenes")
        .populate("tags");
    res.status(200).json(data);
};

const createPost = async (req, res) => {
    const newPost = await Post.create({
        description: req.body.description,
        nickName: req.body.nickName,
        fecha: req.body.fecha
    });

    if (req.body.imagenes != null) {
        for (const i of req.body.imagenes) {
            await Post_Image.create({ url: i, postId: newPost._id });
        }
    }

    res.status(201).json(newPost);
};

const deletePostById = async (req, res) => {
    const data = await Post.findById(req.params.id).populate("comentarios");
    await Promise.all(data.comentarios.map(c => c.deleteOne()));
    const removed = await data.deleteOne();
    res.status(200).json(removed);
};

const putPostById = async (req, res) => {
    await Post.updateOne({ _id: req.params.id }, req.body);
    const data = await Post.findById(req.params.id);
    res.status(201).json(data);
};

const putPostImageById = async (req, res) => {
    const { id, imageId } = req.params;
    const { url } = req.body;

    const image = await Post_Image.findOne({ _id: imageId, postId: id });
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

    image.url = url;
    await image.save();

    res.status(200).json({ message: "Imagen actualizada exitosamente" });
};

const deletePostImgById = async (req, res) => {
    const { id, imageId } = req.params;

    const image = await Post_Image.findOne({ _id: imageId, postId: id });
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

    await image.deleteOne();

    res.status(200).json({ message: "Imagen eliminada exitosamente" });
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePostById,
    putPostImageById,
    putPostById,
    deletePostImgById
};
