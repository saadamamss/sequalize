const express = require('express');
const route = express.Router();
const db = require("../models");


route.post("/user/create" , (req , res , next)=>{
    db.User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then(response=> res.status(200).send(response))
    .catch(err=>res.status(400).send(err));
    
});

route.get("/users" , (req , res , next)=>{
    db.User.findAll().then(response=> res.status(200).send(response))
    .catch(err=>res.status(400).send(err));
});
route.get("/user/:id" , (req , res , next)=>{
    db.User.findOne({where:{id:req.params.id}}).then(response=> res.status(200).send(response))
    .catch(err=>res.status(400).send(err));
});




module.exports = route;