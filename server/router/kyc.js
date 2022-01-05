const express = require("express");

const { storeKyc } = require("../controller/kyc");

const router = express.Router();

const multer = require("multer");

router.post("/store-kyc",multer().any(),storeKyc);

module.exports = router;