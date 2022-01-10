const express = require("express");

const { getHashedKyc,kycStoredOnBlockchainSuccess } = require("../controller/ethereum");

const router = express.Router();

router.post("/get-hashed-kyc",getHashedKyc);
router.post("/kyc-stored-on-blockchain-success",kycStoredOnBlockchainSuccess);

module.exports = router;