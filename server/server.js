const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const usersRoutes = require("./router/users.js")
const kycRoutes = require("./router/kyc.js")

const { initEssentials } = require("./utils/initEssentials");

// For adding .env variables into node.js
dotenv.config();

const app = express();
const PORT = 8080;

// For parsing Json objects received from the frontend
app.use(bodyParser.json({ limit:"10mb" }))

// To prevent cross origin resource sharing (cors) errors in frontend 
app.use(cors());

// routes
app.use('/users',usersRoutes);

app.use('/kyc',kycRoutes);

app.use('/',(req,res) => {
    
    res.send("Backend Is up and running");

});

// Global error handler for all controllers...
app.use((err,req,res,next) => {

    console.log(err);

    if(!err.status)
        err.status = 501;

    res.status(err.status).json(err);
})

app.listen(PORT, async() => {

    // Configure monogoose connection and setup ipfs node.
    await initEssentials();

    console.log(`Example app listening at http://localhost:${PORT}`)

});