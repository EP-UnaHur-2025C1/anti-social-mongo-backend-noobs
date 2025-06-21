const { Tag } = require('../models')
const { Post } = require('../models')

const getTags = async (req, res) => {
    const data = await Tag.find();
    res.status(200).json(data);
}

const getTagById = async (req, res) => {
    const data = await Tag.findById(req.params.id)
    if (!data) return res.status(404).json({ error: 'Tag No Encontrado' });
    res.status(200).json(data);
}

const createTag = async (req, res) => {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
};

const deleteTagById = async (req, res) => {
    const data = await Tag.findById(req.params.id)
    if (!data) return res.status(404).json({ error: 'Tag No Encontrado' });
    const removed = await data.deleteOne();
    res.status(200).json(removed);
};

const putTagById = async (req, res) => {
    await Tag.updateOne({ _id: req.params.id }, req.body);
    const data = await Tag.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Tag No Encontrado' });
    res.status(201).json(data);
};


module.exports = { getTags, getTagById, createTag, deleteTagById, putTagById }
