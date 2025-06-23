const { Post_Image, Post } = require('../models')

const getPost_Images = async (_, res) => {
    try {
        const images = await Post_Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getPost_ImageById = async (req, res) => {
    try {
        const idPost = req.params.id
        const image = await Post_Image.findById(idPost);
        if (!image) return res.status(404).json({ error: 'Imagen No Encontrada' });
        const posts = await Post.find({ imagenes: { $in: image._id } }).select('_id')
        res.status(200).json({ image, posts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createPost_Image = async (req, res) => {
    try {
        const newPost_Image = new Post_Image(req.body);
        await newPost_Image.save()
        res.status(201).json(newPost_Image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePost_ImageById = async (req, res) => {
    try {
        const idImg = req.params.id
        const image = await Post_Image.findByIdAndDelete(idImg);
        if (!image) return res.status(404).json({ error: 'Imagen No Encontrada' });
        res.status(200).json(image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const putPost_ImageById = async (req, res) => {
    try {
        const idImg = req.params.id
        const newImg = await Post_Image.findByIdAndUpdate(
            idImg,
            req.body,
            { new: true }
        )
        if (!newImg) return res.status(404).json({ error: 'Imagen No Encontrada' });
        res.status(201).json(newImg);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getPost_Images, getPost_ImageById, createPost_Image, deletePost_ImageById, putPost_ImageById }
