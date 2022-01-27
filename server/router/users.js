const express = require("express");

const { storeUser,getMessage,getUserInfo, getRequests } = require("../controller/users");

const router = express.Router();

router.post('/store-user', storeUser );
router.post('/get-user', getUserInfo );
router.get('/get-requests/:userId',getRequests );

router.post('/get-messages', getMessage );

module.exports = router;