const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const ipfsRoutes = require("./router/ipfs.js");
const usersRoutes = require("./router/users.js")
const kycRoutes = require("./router/kyc.js")

const { initEssentials } = require("./utils/initEssentials");

// For adding .env variables into node.js
dotenv.config();

const app = express();
const PORT = 8080;

// For parsing Json objects received from the frontend
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

// To prevent cross origin resource sharing (cors) errors in frontend 
app.use(cors());

// routes
app.use('/ipfs',ipfsRoutes);

app.use('/users',usersRoutes);

app.use('/kyc',kycRoutes);

app.use('/',(req,res) => {
    
    res.send("Backend Is up and running");

});

app.listen(PORT, async() => {

    // Configure monogoose connection and setup ipfs node.
    await initEssentials();

    console.log(`Example app listening at http://localhost:${PORT}`)

});