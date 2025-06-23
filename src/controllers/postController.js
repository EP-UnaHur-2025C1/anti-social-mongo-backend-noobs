const { Post, Post_Image, User, Tag, Comment } = require('../models');

const getPosts = async (_, res) => {
    try {
        const data = await Post.find()
            .populate({
                path: 'user',
                select: ['nickName', 'email']
            })
            .populate({
                path: 'imagenes',
                select: 'url'
            })
            .populate({
                path: 'tags',
                select: 'tagName'
            })
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const idPost = req.params.id
        const post = await Post.findById(idPost)
            .populate({
                path: 'user',
                select: ['nickName', 'email']
            })
            .populate({
                path: 'imagenes',
                select: 'url'
            })
            .populate({
                path: 'tags',
                select: 'tagName'
            })

        if (!post) return res.status(404).json({ error: 'Post No Encontrado' });

        const seisMesesAtras = new Date();
        seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
        const comments = await Comment.find({
            $and: [
                { postId: idPost },
                { fecha: { $gte: seisMesesAtras } }]
        })
            .populate({
                path: 'postId',
                select: '_id'
            })
            .populate({
                path: 'user',
                select: 'nickName'
            })

        res.status(200).json({ post, comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const name = req.body.nickName;
        const user = await User.findOne({ nickName: name })
        if (!user) {
            return res.status(404).json({ message: `No existe ningun usuario con el nickName ${name}` });
        }
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

        const newPost = new Post({
            description: req.body.description,
            user: user._id,
            fecha: req.body.fecha,
            imagenes: imagenIds,
            tags: tagIds
        });
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePostById = async (req, res) => {
    try {
        const idPost = req.params.id
        const post = await Post.findByIdAndDelete(idPost)
        if (!post) return res.status(404).json({ error: 'Post No Encontrado' });
        await Comment.deleteMany({ postId: idPost })
        res.status(200).json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const putPostById = async (req, res) => {
    try {
        const idPost = req.params.id
        const udPost = await Post.findByIdAndUpdate(
            { _id: idPost },
            req.body,
            { new: true }
        );
        if (!udPost) return res.status(404).json({ error: 'Post No Encontrado' });
        res.status(201).json(udPost);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const putPostImage = async (req, res) => {
    try {
        const idPost = req.params.id;
        const url = req.body.url;

        const post = await Post.findById(idPost);
        if (!post) return res.status(404).json({ error: "Post no encontrado" });

        const newImage = await Post_Image.create({ url, postId: idPost });

        post.imagenes.push(newImage._id);
        await post.save();

        res.status(200).json(newImage);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const putPostImageById = async (req, res) => {
    const { idPost, imageId } = req.params;
    const { url } = req.body;

    const image = await Post_Image.findOne({ _id: imageId });
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

    image.url = url;
    await image.save();

    res.status(200).json({ message: "Imagen actualizada exitosamente" });
};

const deletePostImgById = async (req, res) => {
    const { id, imageId } = req.params;
    const post = await Post.findOne({ _id: id });
    const image = await Post_Image.findOne({ _id: imageId });
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });
    if (!post) return res.status(404).json({ error: "Post no encontrada" });
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
    putPostImage
};
