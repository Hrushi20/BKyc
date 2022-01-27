const express = require("express");

const { grantedBankKyc, requestUserKyc, getAllUserDetails, getAllBankStatus,rejectBankKyc,terminateBankKyc } = require("../controller/banks");

const router = express.Router();

router.post('/requestUserKyc', requestUserKyc);
router.post('/grantedBankKyc', grantedBankKyc);
router.post('/rejectBankKyc', rejectBankKyc);
router.post('/terminateBankKyc', terminateBankKyc);
router.get('/getAllUserDetails/:bankId', getAllUserDetails);
router.get('/getAllBankStatus/:userId',getAllBankStatus)

module.exports = router;