const express = require("express");
const { requireSignin, userMiddleWare } = require("../../common-middleware");

const { createGeo, deleteGeo } = require("../../controller/geolocation");
const router = express.Router();

router.put("/addgeolocation", requireSignin, userMiddleWare, createGeo);
router.delete("/delete/data", requireSignin, userMiddleWare, deleteGeo);

module.exports = router;
