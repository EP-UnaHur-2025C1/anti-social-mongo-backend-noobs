const { Tag } = require('../models')
const { Post } = require('../models')

const getTags = async (_, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTagById = async (req, res) => {
    try {
        const idTac = req.params.id
        const tac = await Tag.findById(idTac)
        if (!tac) return res.status(404).json({ error: 'Tag No Encontrado' });
        const posts = await Post.find({ tags: { $in: tac._id } }).select('_id')

        res.status(200).json({ tac, posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTag = async (req, res) => {
    try {
        const newTag = new Tag(req.body);
        newTag.save()
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTagById = async (req, res) => {
    try {
        const idTac = req.params.id
        const tag = await Tag.findByIdAndDelete(idTac)
        if (!tag) return res.status(404).json({ error: 'Tag No Encontrado' });
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putTagById = async (req, res) => {
    try {
        const idTac = req.params.id
        const tag = await Tag.findByIdAndUpdate(
            idTac,
            req.body,
            { new: true }
        );
        if (!tag) return res.status(404).json({ error: 'Tag No Encontrado' });
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getTags, getTagById, createTag, deleteTagById, putTagById }
