const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connectDB = require("./Database/connectionDB");
const userRouter = require("./Routers/UserRouter");
const bookRouter = require("./Routers/BookRouter")




app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
connectDB();


app.listen(port, ()=>{
    console.log(`App is running on the port ${port}`)
})