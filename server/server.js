const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const ipfsRoutes = require("./router/ipfs.js");
const { initIpfs } = require("./utils/ipfs");

const app = express();
const port = 8080;

app.use(bodyParser.json())

app.use(cors());

// routes

app.use('/ipfs',ipfsRoutes);


app.use('/',(req,res) => {
    
    res.send("Backend Is up and running");

});



app.listen(port, async() => {

    await initIpfs();

    console.log(`Example app listening at http://localhost:${port}`)

});