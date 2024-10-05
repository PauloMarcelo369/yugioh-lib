const AuthController = require("../controllers/AuthController.js");
const router = require("express").Router();
const authorization = require("../middlewares/Authenticate.js");

router.post("/register", AuthController.userRegister);
router.post("/login", AuthController.userLogin);
router.get("/userInfo", authorization, AuthController.getLoggedUserInfo);

module.exports = router;
