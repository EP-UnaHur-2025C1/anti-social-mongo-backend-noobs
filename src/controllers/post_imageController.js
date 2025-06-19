const { Post_Image } = require('../db/models')

const getPost_Images = async (req, res) => {
    const data = await Post_Image.find();
    res.status(200).json(data);
}

const getPost_ImageById = async (req, res) => {
    const data = await Post_Image.findById(req.params.id);
    res.status(200).json(data);
}

const createPost_Image = async (req, res) => {
    const newPost_Image = await Post_Image.create(req.body);
    res.status(201).json(newPost_Image);
};

const deletePost_ImageById = async (req, res) => {
    const data = await Post_Image.findById(req.params.id);
    const removed = await data.remove();
    res.status(200).json(removed);
};

const putPost_ImageById = async (req, res) => {
    await Post_Image.updateOne({ _id: req.params.id }, req.body);
    const data = await Post_Image.findById(req.params.id);
    res.status(201).json(data);
};

module.exports = { getPost_Images, getPost_ImageById, createPost_Image, deletePost_ImageById, putPost_ImageById }
