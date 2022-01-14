const express = require("express");

const { storeUser,getMessage,getUserInfo } = require("../controller/users");

const router = express.Router();

router.post('/store-user', storeUser );
router.post('/get-user', getUserInfo );

router.post('/get-messages', getMessage );

module.exports = router;