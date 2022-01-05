const express = require("express");

const { getUser,storeUser } = require("../controller/users");

const router = express.Router();

router.get("/store-user",storeUser);

router.get("/get-user",getUser);

module.exports = router;