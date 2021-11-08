const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_EKOSECD);
    req.user = user;
  } else {
    return res.status(401).json({ msg: "Autorisation Required" });
  }
  next();
};

exports.userMiddleWare = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "Acess Denied !" });
  }
  next();
};
