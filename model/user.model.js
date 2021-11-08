const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const salts = bcrypt.genSaltSync(saltRounds);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 32,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 32,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function (fullName) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
