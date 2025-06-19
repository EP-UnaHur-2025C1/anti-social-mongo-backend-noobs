const { Router } = require("express");
const router = Router();
const {tagController} = require('../controllers')
//const {middlewareGenerico} = require('../middleware')
//const { Tag } = require("../db/models");
//const {tagSchema} = require("../schemas")

router.get("/", tagController.getTags);

router.get(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Tag),
  tagController.getTagById
);

router.post(
  "/",
  //middlewareGenerico.schemaValidator(tagSchema),
  tagController.createTag
);

router.delete(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Tag),
  tagController.deleteTagById
);

router.put(
  "/:id",
  //middlewareGenerico.validaId,
  //middlewareGenerico.existsModelById(Tag),
  tagController.putTagById
);

module.exports = router;