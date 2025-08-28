const express = require("express")
const userController = require("../controller/user.controller")
const userRouter = express.Router()

userRouter.get("/test", userController.test)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.get("/logout",userController.logout)

module.exports = userRouter