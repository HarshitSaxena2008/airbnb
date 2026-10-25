const Home = require("../Model/homeModel");
const User = require("../Model/userModal");
const mongoose = require("mongoose");
exports.userHomeHandler = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("Store/index(2)", {
      pageTitle: "airbnb",
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.user,
    });
  });
};

exports.myHomesHandler = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("Store/home", {
      pageTitle: "My Homes",
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.user,
    });
  });
};

exports.favourtiesReqHandler = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("favorites")
    .then((user) => {
      const filteredHome = user.favorites;
      res.render("Store/favorites", {
        pageTitle: "Favorites - Page",
        filteredHome: filteredHome,
        isLoggedIn: req.isLoggedIn,
        user: req.user,
      });
    });
  // .then((HomesIds) => {
  //   Home.find()
  //     .then((homes) => {
  //       const home = homes[0];

  //       console.log(home._id);
  //       const filteredHome = HomesIds.map(({ _id, houseId }) =>
  //         homes.find((home) => home.id == houseId),
  //       ).filter(Boolean);

  //       res.render("Store/favorites", {
  //         pageTitle: "Favorites - Page",
  //         filteredHome: filteredHome,
  //       });
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // })
  // .catch((err) => {
  //   next(err);
  // });
};

exports.postFavourtiesReqHandler = (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user.favorites.includes(homeId)) {
        user.favorites.push(homeId);
        return user.save();
      }
      return user;
    })
    .then(() => {
      res.redirect("/favorites");
    });
};

exports.postRemoveFav = (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  User.findById(userId)
    .then((user) => {
      user.favorites.pull(homeId);
      return user.save();
    })
    .then(() => {
      res.redirect("/favorites");
    })
    .catch((err) => {
      next(err);
    });
};

exports.homeDetailsHandler = (req, res, next) => {
  const homeId = req.params.homeId;
  if (!mongoose.isValidObjectId(homeId)) {
    return res.status(400).send("Invalid Home ID");
  }
  console.log(homeId);
  Home.findById(homeId).then((home) => {
    console.log(home);
    if (!home) {
      res.redirect("/");
    } else {
      res.render("Store/details", {
        pageTitle: "Home Details",
        home: home,
        isLoggedIn: req.isLoggedIn,
        user: req.user,
      });
    }
  });
};
