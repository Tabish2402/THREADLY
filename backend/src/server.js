
import express from "express";

import {ENV}from "./config/env.js"
const app=express();

app.get("/",(req,res) => {
    res.send("hellow world");
});
app.listen(ENV.PORT,()=>console.log("Server started on: ",ENV.PORT));
