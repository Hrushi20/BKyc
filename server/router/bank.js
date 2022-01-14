const express = require("express");

const { grantedBankKyc, requestUserKyc, getAllGrantedUserDetails, getAllBankStatus } = require("../controller/banks");

const router = express.Router();

router.post('/requestUserKyc', requestUserKyc);
router.post('/grantedBankKyc', grantedBankKyc);
router.get('/getAllGrantedUserDetails/:bankId', getAllGrantedUserDetails);
router.get('/getAllBankStatus/:userId',getAllBankStatus)

module.exports = router;