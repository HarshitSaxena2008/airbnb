const express = require("express");

const userReqRouter = express.Router();

const userController = require("../Controller/userController");
userReqRouter.get("/", userController.userHomeHandler);
userReqRouter.get("/homes", userController.myHomesHandler);
userReqRouter.get("/favorites", userController.favourtiesReqHandler);
userReqRouter.post("/favorites", userController.postFavourtiesReqHandler);
userReqRouter.post("/remove-fav", userController.postRemoveFav);
userReqRouter.get("/:homeId", userController.homeDetailsHandler);

module.exports = userReqRouter;
