const { Router } = require("express");
const router = Router();
const { post_imageController } = require('../controllers')
//const {middlewareGenerico} = require('../middleware')
//const { Post_Image } = require("../db/models");
//const {post_imageSchema} = require("../schemas")

router.get("/", post_imageController.getPost_Images);

router.get(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post_Image),
  post_imageController.getPost_ImageById
);

router.post(
  "/",
  //middlewareGenerico.schemaValidator(post_imageSchema),
  post_imageController.createPost_Image
);

router.delete(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post_Image),
  post_imageController.deletePost_ImageById
);

router.put(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post_Image),
  post_imageController.putPost_ImageById
);

module.exports = router;