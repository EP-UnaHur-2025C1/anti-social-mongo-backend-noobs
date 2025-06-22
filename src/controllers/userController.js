const { User, Post, Comment } = require('../models')


const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserByNickName = async (req, res) => {
    try {
        const name = req.params.nickName;
        const user = await User.findOne({ nickName: name })
        if (!user) {
            return res.status(404).json({ message: `No existe ningun usuario con el nickName ${name}` });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUserByNickName = async (req, res) => {
    try {
        const name = req.params.nickName;
        const user = await User.findOne({ nickName: name })
        if (!user) {
            return res.status(404).json({ message: `No existe ningun usuario con el nickName ${name}` });
        }
        await Post.deleteMany({ user: user._id })
        await Comment.deleteMany({ user: user._id })
        await User.deleteOne(user._id)
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const putUserByNickName = async (req, res) => {
    try {
        const name = req.params.nickName;
        const user = await User.findOne({ nickName: name })
        if (!user) {
            return res.status(404).json({ message: `No existe ningun usuario con el nickName ${name}` });
        }
        const userActualizado = await User.findByIdAndUpdate(user._id, req.body, { new: true })
        res.json({ message: 'User actualizado', user: userActualizado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el user', error: error.message });
    }
};

module.exports = { getUsers, createUser, getUserByNickName, deleteUserByNickName, putUserByNickName }
