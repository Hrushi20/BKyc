const express = require("express");

const { getHashedKyc,kycStoredOnBlockchainSuccess } = require("../controller/ethereum");

const router = express.Router();

router.get("/get-hashed-kyc/:userId",getHashedKyc);
router.get("/kyc-stored-on-blockchain-success/:userId",kycStoredOnBlockchainSuccess);

module.exports = router;