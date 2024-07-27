const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log("Express run " + PORT);
})

app.get("/api",(req,res)=>{
    res.send('Hello Worlds')
})


