const { Post } = require('../models');
const { Post_Image } = require('../models');
const { User } = require('../models');
const { Tag } = require('../models');

const getPosts = async (req, res) => {
    const data = await Post.find()
        .populate("user")
        .populate("imagenes")
        .populate("tags");
    res.status(200).json(data);
};

const getPostById = async (req, res) => {
    const data = await Post.findById(req.params.id)
        .populate("imagenes")
        .populate("tags");
    if (!data) return res.status(404).json({ error: 'Post No Encontrado' });
    res.status(200).json(data);
};

const createPost = async (req, res) => {
    try {
        const name = req.body.nickName;
        const user = await User.findOne({ nickName: name })
        if (!user) {
            return res.status(404).json({ message: `No existe ningun usuario con el nickName ${name}` });
        }
        const newPost = await Post.create({ description: req.body.description, nickName: name, fecha: req.body.fecha, user: user._id });
        res.status(201).json(newPost.populate("imagenes"));
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const deletePostById = async (req, res) => {
    const data = await Post.findById(req.params.id)
    if (!data) return res.status(404).json({ error: 'Post No Encontrado' });
    const removed = await data.deleteOne();
    res.status(200).json(removed);
};

//Falta probar de aca para abajo ***********************************

const putPostById = async (req, res) => {
    await Post.updateOne({ _id: req.params.id }, req.body);
    const data = await Post.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Post No Encontrado' });
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
