const express = require("express");

const { getHashedKyc,kycStoredOnBlockchainSuccess,getKycofUserForBank } = require("../controller/ethereum");

const router = express.Router();

router.get("/get-hashed-kyc/:userId",getHashedKyc);
router.get("/kyc-stored-on-blockchain-success/:userId",kycStoredOnBlockchainSuccess);
router.get('/get-decrypted-kyc-for-bank/:kycId',getKycofUserForBank);

module.exports = router;