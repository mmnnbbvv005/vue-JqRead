/*
Node.js操作数据库:
在写代码之前，需要安装一个模块
$ cnpm install mysql
*/
// 连接数据库：
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '18785416102',
  database: 'gjq'
})

module.exports = connection
