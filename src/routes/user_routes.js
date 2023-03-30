const express = require("express");
const { signUp, signIn } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/sign_up", signUp);

userRouter.post("/sign_in", signIn);

module.exports = userRouter;
