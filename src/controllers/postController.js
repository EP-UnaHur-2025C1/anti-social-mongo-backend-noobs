const Post = require('../schemas/postSchema');

const getPosts = async (req, res) => {
  try {
    const data = await Post.find()
      //.populate('usuario') // Asumiendo que usuario es el ref a User
      //.populate('imagenes')
      //.populate('tags');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPostById = async (req, res) => {
  try {
    const data = await Post.findById(req.params.id)
      .populate('comentarios')
      .populate('imagenes')
      .populate('tags');

    if (!data) return res.status(404).json({ error: 'Post no encontrado' });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      description: req.body.description,
      nickName: req.body.nickName,
      fecha: req.body.fecha,
      imagenes: req.body.imagenes ?? []
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comentarios');

    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    await Promise.all(post.comentarios.map(c => c.remove()));

    const removed = await post.remove();
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const putPostById = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const putPostImageById = async (req, res) => {
  const { id, imageId } = req.params;
  const { url } = req.body;

  try {
    const post = await Post.findById(id);

    const imageIndex = post.imagenes.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) return res.status(404).json({ error: "Imagen no encontrada" });

    post.imagenes[imageIndex].url = url;
    await post.save();

    res.status(200).json({ message: "Imagen actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la imagen" });
  }
};

const deletePostImgById = async (req, res) => {
  const { id, imageId } = req.params;

  try {
    const post = await Post.findById(id);

    const newImgs = post.imagenes.filter(img => img._id.toString() !== imageId);
    if (newImgs.length === post.imagenes.length) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    post.imagenes = newImgs;
    await post.save();

    res.status(200).json({ message: "Imagen eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la imagen" });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePostById,
  putPostById,
  putPostImageById,
  deletePostImgById
};
