const { User } = require('../db/models')

const getUsers = async (req, res) => {
    const data = await User.find();
    res.status(200).json(data);
}

const getUserByNickName = async (req, res) => {
    const data = await User.findOne({ nickName: req.params.nickName })
        .populate("comentarios")
        .populate("posts")
        .populate("seguidores")
        .populate("seguidos");
    res.status(200).json(data);
}

const createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

const deleteUserByNickName = async (req, res) => {
    const data = await User.findOne({ nickName: req.params.nickName })
        .populate("comentarios")
        .populate("posts")
        .populate("seguidores")
        .populate("seguidos");
    await Promise.all(data.comentarios.map(c => c.remove()));
    await Promise.all(data.posts.map(p => p.remove()));
    data.seguidores = [];
    data.seguidos = [];
    await data.save();
    const removed = await data.remove();
    res.status(200).json(removed);
};

const putUserByNickName = async (req, res) => {
    await User.updateOne({ nickName: req.params.nickName }, req.body);
    const data = await User.findOne({ nickName: req.body.nickName });
    res.status(201).json(data);
};

module.exports = { getUsers, createUser, getUserByNickName, deleteUserByNickName, putUserByNickName }
