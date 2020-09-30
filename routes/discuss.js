var express = require('express')
var router = express.Router()
const pool = require('../db/dbConfig')
var moment = require('moment');


router.post('/',function(req,res,next) {
  pool.getConnection(function(err,connection) {
    if(err){
      console.log(err)
    }else{
      console.log('连接成功')
      console.log(req.body.values)
      const now = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
      sql = "insert into reply (topic_id,from_id,content,to_id,send_time,favorites) values (" + req.body.values.topic_id + "," + "'" + req.body.values.username +"'"+  "," + "'" + req.body.values.reply + "'" + ",0," + "'" + now + "'" + ",0)"  
      console.log(sql)
      connection.query(sql,function(err,result) {
        if(err){
          console.log(err)
          res.send('reply failed')
          connection.release()
        }
        else{
          console.log(result)
          console.log('插入成功')
        }
      })
      const num = req.body.values.topic_id
      console.log(num)
      
      incsql = "update content set comments = comments+1 where id = " + num
      connection.query(incsql,function(err,result) {
        if(err){
          console.log(err)
          connection.release()
        }else{
          console.log(result)
          console.log('更新成功')
          res.send('reply success')
          connection.release()
        }
      })
    }
  })
})

module.exports = router