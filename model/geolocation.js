const mongoose = require("mongoose");

// const salts = bcrypt.genSaltSync(saltRounds);

const Geolocation = new mongoose.Schema(
  {
    continent_name: {
      type: String,
    },

    ip: {
      type: String,
    },
    continent_code: {
      type: String,
    },
    country_code: {
      type: String,
    },
    country_name: {
      type: String,
    },
    region_code: {
      type: String,
    },
    region_name: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Geolocation", Geolocation);
