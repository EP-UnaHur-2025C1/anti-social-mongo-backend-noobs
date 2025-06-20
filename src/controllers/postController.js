const { Post } = require('../db/models');
const { Post_Image } = require('../db/models');
const { User } = require('../db/models');
const { Tag } = require('../db/models');

const getPosts = async (req, res) => {
    const data = await Post.find()
        .populate("nickName")
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
    const user = await User.findOne({ nickName: req.body.nickName });
    if (!user) return res.status(404).json({ error: 'NickName No Encontrado' });

    let imagenIds = [];
    if (req.body.imagenes && Array.isArray(req.body.imagenes)) {
      const imagenDocs = await Post_Image.find({ url: { $in: req.body.imagenes } });
      imagenIds = imagenDocs.map(img => img._id);
    }

    let tagIds = [];
        if (Array.isArray(req.body.tags)) {
            const tags = await Tag.find({ tagName: { $in: req.body.tags } });
            tagIds = tags.map(tag => tag._id);
        }
    
    const newPost = await Post.create({
        description: req.body.description,
        nickName: user._id,
        fecha: req.body.fecha,
        imagenes: imagenIds,
        tags: tagIds
    });

    res.status(201).json(newPost);
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
