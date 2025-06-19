const { Router } = require("express");
const router = Router();
const { userController } = require('../controllers')
//const { middlewareGenerico, userMiddleware } = require('../middleware')
//const { User } = require("../db/models");
//const { userSchema } = require("../schemas")

router.get("/", userController.getUsers);

router.get(
  "/:nickName",
  //userMiddleware.validaNickName,
  //userMiddleware.existsModelByNickName(User),
  userController.getUserByNickName
);

router.post(
  "/",
  //middlewareGenerico.schemaValidator(userSchema),
  userController.createUser
);

router.delete(
  "/:nickName",
  //userMiddleware.validaNickName,
  //userMiddleware.existsModelByNickName(User),
  userController.deleteUserByNickName
);

router.put(
  "/:nickName",
  //userMiddleware.validaNickName,
  //userMiddleware.existsModelByNickName(User),
  userController.putUserByNickName
);

module.exports = router;