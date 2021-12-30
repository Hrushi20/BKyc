const express = require("express");

const { storeFile } = require("../controller/ipfs");

const router = express.Router();

router.get("/store-file",storeFile);

module.exports = router;