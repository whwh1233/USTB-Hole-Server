const mysql = require('mysql');


var pool = mysql.createPool({
  host:'bj-cdb-5zoxxozq.sql.tencentcdb.com',
  port:'61303',
  user:'root',
  password:'whwh1233',
  database:'hole'
})

module.exports = pool