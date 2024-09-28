const AuthController = require("../controllers/AuthController.js");
const router = require("express").Router();

router.post("/register", AuthController.userRegister);
router.post("/login", AuthController.userLogin);

module.exports = router;
