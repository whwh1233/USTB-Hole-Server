var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../db/dbConfig')
const jwt = require('jsonwebtoken')

const secretKey = 'USTBHole'

router.post('/',function(req,res,next) {
  console.log(req.headers.token)
  const token = req.headers.token
  pool.getConnection(function(err,connection) {
    if(err){
      console.log(err)
      res.send('连接失败')
    }
    else{
      console.log('连接成功')
      console.log(req.query)
      const sql = "select * from user where username = " + req.query.username
      connection.query(sql,(err,result) => {
        if(err){
          console.log(err)
          res.send({
            message:'no user',
          })
          connection.release()
        }
        else{
          console.log('获取成功')
          if(result[0].password === req.query.password){
            connection.release()
            let tokenContent = {username: req.query.username,password:req.query.password}
            let token = jwt.sign(tokenContent,secretKey,{
              expiresIn: 60*60*24*3
            })
            res.send({
              message:'login success',
              token:token
            })

          } 
          else{
            res.send({
              message:'wrong password',
            })
            connection.release()
          }
        }
      })
      
    }
  })
})

module.exports = router;
