const express = require("express");

const { storeKyc,getKycsForVerification } = require("../controller/kyc");

const router = express.Router();

// To accept multipart/form data 
const multer = require("multer");

router.post("/store-kyc",multer().any(),storeKyc);

router.get("/get-unverified-kycs",getKycsForVerification);

module.exports = router;