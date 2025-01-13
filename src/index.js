//require('dotenv').config({path: '.env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js';

dotenv.config({
    path: './.env',
})

const PORT = process.env.PORT || 8000
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log("⚙️ server is Listening on port:", PORT);
    } )
        
    })
.catch((err) => {
    console.log("MONGO db connection to DB :: Error:: ", err);
    
})















/*
import express from "express";
;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAM}`)
        app.on("error", (error) => {
            console.log("ERRR:" , error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`);
        })
    } catch(error) {
        console.log("ERROR:", error)
        throw error
    }
})()
const connectDB(){}

connectDB()
*/