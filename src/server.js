
require('dotenv').config({path: './env'})
// import dotenv from "dotenv";
// import connectDB from './config/db';
import express from "express";
import {app} from './app'

// connectDB()
// .then(() => {
//     const PORT = process.env.PORT || 8000;
//     app.listen(process.env.PORT || 8000 , () =>{
//         console.log(`Server is running at port : ${process.env.PORT}`);  
//     })
// })
// .catch((err) =>{
//     console.log("MONGO db connection failed !!! ", err);
// })



app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});

