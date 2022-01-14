const express = require("express");

const { grantedBankKyc, requestUserKyc, getAllGrantedUserDetails } = require("../controller/banks");

const router = express.Router();

router.post('/requestUserKyc', requestUserKyc);
router.post('/grantedBankKyc', grantedBankKyc);
router.get('/getAllGrantedUserDetails/:bankId', getAllGrantedUserDetails);
module.exports = router;