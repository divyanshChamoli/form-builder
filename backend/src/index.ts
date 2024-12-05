import express from "express"
require('dotenv').config()
const app = express()

// Form info 
//Create form and put into db POST 
//Edit form PUT
//Submit form POST

app.get("/",(req, res)=>{
    res.json({
        message: "Working"
    })
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})

