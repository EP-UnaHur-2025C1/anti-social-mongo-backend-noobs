const { Post } = require('../models');
const { Post_Image } = require('../models');
const { User } = require('../models');
const { Tag } = require('../models');

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
    try {
        const name = req.body.nickName;
        const user = await User.findOne({ nickName: name })
        if (!user) {
            return res.status(404).json({ message: `No existe ningun usuario con el nickName ${name}` });
        }
        //const newPost = await Post.create({ description: req.body.description, nickName: name, fecha: req.body.fecha, user: user._id });
        let imagenIds = [];

        if (req.body.imagenes && Array.isArray(req.body.imagenes)) {
            for (const url of req.body.imagenes) {
                let imagen = await Post_Image.findOne({ url });
                if (!imagen) {
                    imagen = await Post_Image.create({ url });
                }
                imagenIds.push(imagen._id);
            }
        }

        let tagIds = [];

        if (Array.isArray(req.body.tags)) {
            for (const tagName of req.body.tags) {
                let tag = await Tag.findOne({ tagName });
                if (!tag) {
                    tag = await Tag.create({ tagName });
                }
                tagIds.push(tag._id);
            }
        }

        const newPost = await Post.create({
            description: req.body.description,
            nickName: user._id,
            fecha: req.body.fecha,
            imagenes: imagenIds,
            tags: tagIds
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

const postPostImageById = async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    const newImage = await Post_Image.create({ url, postId: id });

    post.imagenes.push(newImage._id);
    await post.save();

    res.status(201).json(newImage);
};


const putPostImageById = async (req, res) => {
    const { id, imageId } = req.params;
    const { url } = req.body;

    const image = await Post_Image.findOne({ _id: imageId});
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

    image.url = url;
    await image.save();

    res.status(200).json({ message: "Imagen actualizada exitosamente" });
};

const deletePostImgById = async (req, res) => {
    const { id, imageId } = req.params;

    const image = await Post_Image.findOne({ _id: imageId});
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
    deletePostImgById,
    postPostImageById
};
