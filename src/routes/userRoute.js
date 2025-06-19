const { Router } = require("express");
const router = Router();

const { userController } = require('../controllers');

router.get("/", userController.getUsers);

router.get(
  "/:nickName",
  userController.getUserByNickName
);

router.post(
  "/",
  userController.createUser
);

router.delete(
  "/:nickName",
  userController.deleteUserByNickName
);

router.put(
  "/:nickName",
  userController.putUserByNickName
);

module.exports = router;
