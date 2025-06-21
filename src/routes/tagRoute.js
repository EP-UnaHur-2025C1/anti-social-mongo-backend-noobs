const { Router } = require("express");
const router = Router();
const { tagController } = require('../controllers')


router.get("/", tagController.getTags);

router.get(
  "/:id", tagController.getTagById
);

router.post(
  "/", tagController.createTag
);


router.delete(
  "/:id", tagController.deleteTagById
);

router.put(
  "/:id", tagController.putTagById
);


module.exports = router;