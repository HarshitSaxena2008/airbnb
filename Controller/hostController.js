const Home = require("../Model/homeModel");
const { ObjectId } = require("mongodb");
const { deleteFile } = require("../Utils/file");

exports.hostHomeAddedHandler = (req, res, send) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home Page ",
    editing: false,
    home: null,
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};

exports.postHomeAddedHandler = (req, res, next) => {
  const { houseName, location, price, rating } = req.body;
  if (!req.file) {
    return res
      .status(400)
      .send("No file uploaded. correct image type is requireds");
  }

  const photo = req.file.path;
  console.log(req.file, photo);
  const newObj = new Home({
    houseName,
    location,
    photo: photo,
    price,
    rating,
  });
  console.log(newObj);
  newObj
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/host/host-home-list");
    });
};

exports.getHostHomeList = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("host/host-home-list", {
        pageTitle: "Host-Home-List",
        registeredHomes: homes,
        isLoggedIn: req.isLoggedIn,
        user: req.user,
      });
    })
    .catch((err) => {
      throw err;
    });
};

exports.getEditHome = (req, res, next) => {
  const editing = req.query.editing === "true";
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then((home) => {
      res.render("host/edit-home", {
        pageTitle: "Edit-Home",
        home: home,
        editing: editing,
        isLoggedIn: req.isLoggedIn,
        user: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditHome = (req, res, next) => {
  const { houseName, location, price, rating } = req.body;
  const _id = req.params.homeId;
  console.log(_id);
  Home.findOne({ _id: new ObjectId(String(_id)) })
    .then((home) => {
      if (!home) {
        console.log("home not found");
        return res.redirect("/host-home-list");
      }

      home.houseName = houseName;
      home.location = location;
      if (req.file) {
        deleteFile(home.photo);
        home.photo = req.file.path;
      }
      home.price = price;
      home.rating = rating;
      return home.save();
    })
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("home not edited..", err);
    });
};

exports.postDeleteHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const userId = req.session.user._id;

    const home = await Home.findById(homeId);

    if (!home) {
      return res.redirect("/host/host-home-list");
    }

    await Home.findByIdAndDelete(homeId);

    const user = await User.findById(userId);

    if (user) {
      user.favorites = user.favorites.filter(
        (favId) => favId.toString() !== homeId,
      );

      await user.save();
    }

    res.redirect("/host-home-list");
  } catch (err) {
    next(err);
  }
};
