const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connectDB = require("./Database/connectionDB");



connectDB();
app.listen(port, ()=>{
    console.log(`App is running on the port ${port}`)
})