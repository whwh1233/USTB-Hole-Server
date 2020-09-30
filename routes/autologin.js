var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../db/dbConfig')
const jwt = require('jsonwebtoken')

const secretKey = 'USTBHole'

router.post('/',function(req,res,next){
  console.log(req.headers.token)
  const token = req.headers.token
  if(token === 'null' || token === 'undefined'){
    res.send({
      message:'no token'
    })
  }else{
    jwt.verify(token,secretKey,(err,decoded) => {
      if(err){
        res.send(err)
      }else{
        console.log(decoded)
        res.send({
          message:'login success',
          username:decoded.username,
        })
      }
    })
  }
}) 

module.exports = router