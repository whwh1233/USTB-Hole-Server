var express = require('express');
var router = express.Router();
var moment = require('moment');
const pool = require('../db/dbConfig')

router.post('/',function(req,res,next) {
  pool.getConnection(function(err,connection) {
    if(err){
      console.log(err)
      res.send('publish failed')
    }
    else{
      console.log('连接成功')
      console.log(req.body.content)
      console.log(req.body)
      const now = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
      sql = "insert into content (from_uid,content,send_time,comments,favorites) values ('" + req.body.username + "'"+  "," + "'"+ req.body.content + "'"+  "," + "'" + now +"'"+",0,0)"
      console.log(sql)
      connection.query(sql,function(err,result) {
        if(err){
          res.send('publish failed')
          connection.release()
        }  
        else{
          console.log('插入成功')
          res.send('publish success')
          connection.release()
        }
      })
    }
  })
})



module.exports = router;
