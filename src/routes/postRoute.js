const { Router } = require("express");
const router = Router();

const { postController } = require('../controllers')

router.get("/", postController.getPosts);

router.get(
  "/:id",
  postController.getPostById
);

router.post(
  "/",
  postController.createPost
);

router.delete(
  "/:id",
  postController.deletePostById
);

router.put(
  "/:id",
  postController.putPostById
);

router.put(
  "/:id/images/:imageId",
  postController.putPostImageById
)

router.delete(
  "/:id/images/:imageId",
  postController.deletePostImgById
)



module.exports = router;