const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");

route.post("/test" , async(req,res,next)=>{

    const f = await bcrypt.hash("saad1234" , 10);
    //const r = await bcrypt.compare(req.body.pass , f);

    res.send(f);
});

module.exports = route;