const { User, Post, Comment } = require('../models')


const getUsers = async (_, res) => {
    try {
        const users = await User.find()
        .populate("followers")
        .populate("followeds")
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

const addFollower = async (req, res) => {
  try {
    const { nickName1, nickName2 } = req.params;

    if (nickName1 === nickName2) {
      return res.status(400).json({ message: "Un usuario no puede seguirse a sí mismo" });
    }

    const user1 = await User.findOne({ nickName: nickName1 });
    const user2 = await User.findOne({ nickName: nickName2 });

    if (!user1 || !user2) {
      return res.status(404).json({ message: "Alguno de los usuarios no existe" });
    }

    user1.followeds = user1.followeds || [];
    user2.followers = user2.followers || [];

    const alreadyFollowing = user1.followeds.some(followedId => followedId.equals(user2._id));
    if (alreadyFollowing) {
      return res.status(400).json({ message: `${nickName1} ya sigue a ${nickName2}` });
    }

    user1.followeds.push(user2._id);
    await user1.save();

    user2.followers.push(user1._id);
    await user2.save();

    res.status(200).json({ message: `${nickName1} ahora sigue a ${nickName2}` });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, createUser, getUserByNickName, deleteUserByNickName, putUserByNickName, addFollower }
