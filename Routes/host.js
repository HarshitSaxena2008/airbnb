const express = require("express");

const hostReqRouter = express.Router();

const { hostHomeAddedHandler } = require("../Controller/hostController");
const { postHomeAddedHandler } = require("../Controller/hostController");
const { getHostHomeList } = require("../Controller/hostController");
const { getEditHome } = require("../Controller/hostController");
const { postEditHome } = require("../Controller/hostController");
const { postDeleteHome } = require("../Controller/hostController");

hostReqRouter.get("/add-home", hostHomeAddedHandler);
hostReqRouter.post("/add-home", postHomeAddedHandler);
hostReqRouter.get("/host-home-list", getHostHomeList);
hostReqRouter.get("/host-home-list/edit/:homeId", getEditHome);
hostReqRouter.post("/host-home-list/edit/:homeId", postEditHome);
hostReqRouter.get("/host-home-list/delete/:homeId", postDeleteHome);

module.exports = hostReqRouter;
