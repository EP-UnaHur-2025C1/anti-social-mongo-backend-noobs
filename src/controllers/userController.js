const User = require('../schemas/userSchema');

const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUserByNickName = async (req, res) => {
  try {
    const data = await User.findOne({ nickName: req.params.nickName })
      .populate('comentarios')
      .populate('posts')
      .populate('seguidores')
      .populate('seguidos');

    if (!data) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteUserByNickName = async (req, res) => {
  try {
    const user = await User.findOne({ nickName: req.params.nickName })
      .populate('comentarios')
      .populate('posts')
      .populate('seguidores')
      .populate('seguidos');

    if (!user) return res.status(404).json({ error: 'User not found' });

    await Promise.all([
      ...user.comentarios.map(c => c.remove()),
      ...user.posts.map(p => p.remove())
    ]);

    user.seguidores = [];
    user.seguidos = [];
    await user.save();

    const removed = await user.remove();

    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const putUserByNickName = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { nickName: req.params.nickName },
      req.body,
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getUsers, createUser, getUserByNickName, deleteUserByNickName, putUserByNickName };
