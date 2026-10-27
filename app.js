const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const path = require("path");
const dirName = require("./Utils/dir");

const app = express();
app.set("view engine", "ejs");
app.set("views", "Views");

const userReqRouter = require("./Routes/user");
const hostReqRouter = require("./Routes/host");
const authReqRouter = require("./Routes/auth");
const { default: mongoose } = require("mongoose");
const parser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.urlencoded());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("photo"));
app.use(parser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(express.static(path.join(dirName, "Public")));
app.use(
  "/Public/uploads",
  express.static(path.join(dirName, "Public/uploads")),
);
app.use(
  "/host/Public/uploads",
  express.static(path.join(dirName, "Public/uploads")),
);

app.use((req, res, next) => {
  // // req.isLoggedIn = req.get("cookie")?.split("=")[1] === "true";
  // req.isLoggedIn = req.cookies.isLoggedIn === "true";
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});
app.use((req, res, next) => {
  if (req.isLoggedIn) {
    req.user = req.session.user;
  }
  next();
});
app.use(authReqRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/auth/login");
  }
  next();
});
app.use("/host", hostReqRouter);
app.use(userReqRouter);

app.use((req, res, next) => {
  res.render("404", {
    pageTitle: "Page not found",
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
});

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started successfully...");
    });
  })
  .catch((err) => {
    console.log("Error while connected with MongoDb...", err);
  });
