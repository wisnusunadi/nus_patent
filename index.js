const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require('cors');
const home = require("./routes/home")

//Cors
app.use(cors());

//Dotenv
dotenv.config();
const PORT = process.env.PORT;

//Routes
app.use("/api",home)


app.listen(PORT,() => {
    console.log("Express run " + PORT);
})




