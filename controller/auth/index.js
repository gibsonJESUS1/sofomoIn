const User = require("../../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error || user)
      return res.status(200).json({
        message: "User Already Exist",
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Your Registration was  Successfull.",
        });
      }
    });
  });
};

exports.Signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassord = await user.authenticate(req.body.password);
      if (isPassord && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_EKOSECD,
          {
            expiresIn: "1d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(401).json({ message: "invalide password" });
      }
    }
  });
};
