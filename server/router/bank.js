const express = require("express");

const { grantedBankKyc, requestUserKyc, getAllUserDetails, getAllBankStatus } = require("../controller/banks");

const router = express.Router();

router.post('/requestUserKyc', requestUserKyc);
router.post('/grantedBankKyc', grantedBankKyc);
router.get('/getAllUserDetails/:bankId', getAllUserDetails);
router.get('/getAllBankStatus/:userId',getAllBankStatus)

module.exports = router;