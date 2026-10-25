const express = require("express");

const authReqRouter = express.Router();

const { getSignUp } = require("../Controller/authController");
const { getLogin } = require("../Controller/authController");
const { postLogin } = require("../Controller/authController");
const { postLogout } = require("../Controller/authController");
const { postSignUp } = require("../Controller/authController");

authReqRouter.get("/signup", getSignUp);
authReqRouter.get("/login", getLogin);
authReqRouter.post("/login", postLogin);
authReqRouter.get("/logout", postLogout);
authReqRouter.post("/signup", postSignUp);

module.exports = authReqRouter;
