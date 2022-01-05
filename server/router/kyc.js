const express = require("express");

const { storeKyc } = require("../controller/kyc");

const router = express.Router();

// To accept multipart/form data 
const multer = require("multer");

router.post("/store-kyc",multer().any(),storeKyc);

module.exports = router;