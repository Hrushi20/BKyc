const express = require("express");

const { getUser,storeUser,getMessage } = require("../controller/users");

const router = express.Router();

router.get("/get-user",getUser);

router.post('/store-user', storeUser );

router.post('/get-messages', getMessage );

module.exports = router;