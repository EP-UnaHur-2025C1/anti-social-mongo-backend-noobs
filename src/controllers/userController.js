const { User } = require('../models')

const getUsers = async (req, res) => {
    const data = await User.find();
    res.status(200).json(data);
}

const getUserByNickName = async (req, res) => {
    const data = await User.findOne({ nickName: req.params.nickName })
    //.populate("seguidores")
    //.populate("seguidos");
    if (!data) return res.status(404).json({ error: 'NickName No Encontrado' });
    res.status(200).json(data);
}

const createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

const deleteUserByNickName = async (req, res) => {
    const data = await User.findOne({ nickName: req.params.nickName })
    //.populate("seguidores")
    //.populate("seguidos");
    if (!data) return res.status(404).json({ error: 'NickName No Encontrado' });
    //data.seguidores = [];
    //data.seguidos = [];
    //await data.save();
    const removed = await data.deleteOne();
    res.status(200).json(removed);
};

const putUserByNickName = async (req, res) => {
    await User.updateOne({ nickName: req.params.nickName }, req.body);
    const data = await User.findOne({ nickName: req.body.nickName });
    if (!data) return res.status(404).json({ error: 'NickName No Encontrado' });
    res.status(201).json(data);
};

module.exports = { getUsers, createUser, getUserByNickName, deleteUserByNickName, putUserByNickName }
