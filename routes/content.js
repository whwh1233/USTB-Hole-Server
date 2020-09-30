var express = require('express');
var router = express.Router();
const pool = require('../db/dbConfig')
/* GET users listing. */

router.get('/',function(req,res,next) {
  pool.getConnection(function(err,connection) {
    if(err)
      console.log(err)
    else{
      console.log('连接成功')
      connection.query('select * from content order by send_time desc',(err,result) => {
        if(err){
          console.log('获取数据失败')
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
