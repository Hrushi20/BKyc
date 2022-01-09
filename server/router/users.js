const express = require("express");

const { getUser,storeUser } = require("../controller/users");

const router = express.Router();

router.get("/get-user",getUser);

router.post('/store-user', storeUser )

module.exports = router;