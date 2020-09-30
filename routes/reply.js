var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pool = require('../db/dbConfig')
/* GET users listing. */


router.get('/:topic_id',function(req,res) {
  console.log(req.params.topic_id)
  pool.getConnection(function(err,connection) {
    if(err)
      console.log(err)
    else{
      console.log('连接成功')
      const sql = "select * from reply where topic_id = " + req.params.topic_id
      connection.query(sql,(err,result) => {
        if(err){
          console.log(err)
          connection.release()
        }
        else{
          console.log('获取成功')
          res.send(result)
          connection.release()
        }
      })
    }
  })
  
})

module.exports = router;
