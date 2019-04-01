var mysql = require('./mysql')
var express = require('express')
var router = express.Router()
mysql.connect()

router.post('/login', (req, res) => {
  var params = req.body
  mysql.query("SELECT * FROM `user` WHERE `username` = '" + params.username + "' AND `password` = '" + params.password + "'", function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      if (result.length > 0) {
        res.json({ message: '登录成功', status: 1 })
      } else {
        res.json({ message: '用户名或密码错误', status: 0 })
      }
      res.end('is over')
    }
  })
})

router.post('/register', (req, res) => {
  var params = req.body
  mysql.query("INSERT INTO  `gjq`.`user` (`username` ,`password`)VALUES ('" + params.username + "',  '" + params.password + "');", function (err, result) {
    if (err) {
      res.json(err)
    }
    if (result) {
      if (result.serverStatus === 2) {
        res.json({ message: '注册成功', status: 1 })
        mysql.query('CREATE TABLE `' + params.username + '` (`id` VARCHAR ( 255 ) NOT NULL,`cover` VARCHAR ( 255 ) NOT NULL,`lastChapter` INT NOT NULL,`source` VARCHAR ( 255 ) NOT NULL,`title` VARCHAR ( 255 ) NOT NULL,PRIMARY KEY ( `id` ) )', function (err, result) {
          if (err) {
            console.log(err)
          }
          if (result) {
            console.log(result)
          }
        })
      } else {
        res.json({ message: '注册失败', status: 0 })
      }
      res.end('is over')
    }
  })
})

router.post('/booklist', (req, res) => {
  var params = req.body
  mysql.query('SELECT * FROM `' + params.username + '`', function (err, result) {
    if (err) {
      res.json(err)
    }
    if (result) {
      res.json(result)
      res.end('is over')
    }
  })
})

router.post('/addBook', (req, res) => {
  var params = req.body
  mysql.query('INSERT INTO  `gjq`.`' + params.username + "` (`id` ,`cover`,`lastChapter`,`source`,`title`)VALUES ('" + params.book.id + "',  '" + params.book.cover + "','" + params.book.lastChapter + "','" + params.book.source + "','" + params.book.title + "');", function (err, result) {
    if (err) {
      res.json(err)
    }
    if (result) {
      res.json(result)
      res.end('is over')
    }
  })
})

module.exports = router
