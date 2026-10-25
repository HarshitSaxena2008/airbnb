const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../Model/userModal");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login - airbnb",
    isLoggedIn: false,
    user: req.user,
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up - airbnb",
    isLoggedIn: false,
    user: req.user,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("auth/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      user: req.user,
      errorMessage: "Invalid Email",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("auth/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      user: req.user,
      errorMessage: "Invalid password",
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.postSignUp = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be between 2 and 100 characters")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only letters"),

  check("lastName")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name must contain only letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast one uppercase character")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast one lowercase character")
    .matches(/[!&$@#]/)
    .withMessage("Password must contain atleast one special character")
    .trim(),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions.")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions.");
      }
      return true;
    }),
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    console.log(firstName, lastName, email, password, userType);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: false,
        user: req.user,
        user: req.session.user,
        errors: errors.array().map((err) => err.msg),
        oldInputs: { firstName, lastName, email, password, userType },
      });
    }
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        userType: userType,
      });
      user
        .save()
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).render("auth/signup", {
            pageTitle: "Signup",
            isLoggedIn: false,
            user: req.user,
            user: req.session.user,
            errors: ["An error occurred while creating the user."],
            oldInputs: { firstName, lastName, email, password, userType },
          });
        });
    });
  },
];
