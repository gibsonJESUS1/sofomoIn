const axios = require("axios");
const Geolocation = require("../../model/geolocation");
exports.createGeo = async (req, res) => {
  //   const ipAd = req.socket.remoteAddress;
  const ipAd = req.body.ip;
  accessKey = process.env.IPSTACK;
  let resp = await axios.get(
    `http://api.ipstack.com/${ipAd}?access_key=${accessKey}`
  );
  const user = req.user._id;
  const {
    continent_name,
    ip,
    country_code,
    country_name,
    region_code,
    region_name,
    city,
    zip,
    latitude,
    longitude,
  } = resp.data;

  const geoData = new Geolocation({
    continent_name,

    ip,
    country_code,
    country_name,
    region_code,
    region_name,
    city,
    zip,
    latitude,
    longitude,
    user,
  });
  geoData.save((error, data) => {
    if (error) res.status(400).json({ error });
    if (data) res.status(201).json({ data });
  });
};

exports.deleteGeo = (req, res) => {
  const { id } = req.body.payload;
  Geolocation.findByIdAndDelete({ _id: id }).exec((error, data) => {
    if (error) res.status(400).json({ error });
    if (data) res.status(200).json(" data delected");
  });
};
