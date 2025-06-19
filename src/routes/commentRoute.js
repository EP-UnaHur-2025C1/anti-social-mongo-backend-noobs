const { Router } = require("express");
const router = Router();
const {commentController} = require('../controllers')
//const {middlewareGenerico} = require('../middleware')
//const { Comment } = require("../db/models");
//const {commentSchema} = require("../schemas")

router.get("/", commentController.getComments);

router.get(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Comment),
  commentController.getCommentById
);

router.post(
  "/",
  //middlewareGenerico.schemaValidator(commentSchema),
  commentController.createComment
);

router.delete(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Comment),
  commentController.deleteCommentById
);

router.put(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Comment),
  commentController.putCommentById
);

module.exports = router;