import express, { Router } from "express"
const app = express()
// const router = Router()

app.get("/",(req, res)=>{
    res.json({
        message: "Working"
    })
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})

