const { Router } = require("express");
const router = Router();
const { postController } = require('../controllers')
//const { middlewareGenerico } = require('../middleware')
//const { Post } = require("../db/models");
//const { postSchema } = require("../schemas")

router.get("/", postController.getPosts);

router.get(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post),
  postController.getPostById
);

router.post(
  "/",
  //middlewareGenerico.schemaValidator(postSchema),
  postController.createPost
);

router.delete(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post),
  postController.deletePostById
);

router.put(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post),
  postController.putPostById
);

router.put(
  "/:id/images/:imageId",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post),
  postController.putPostImageById
)

router.delete(
  "/:id/images/:imageId",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Post),
  postController.deletePostImgById
)



module.exports = router;