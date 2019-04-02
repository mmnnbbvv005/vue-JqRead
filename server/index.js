const userApi = require('./api')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// 中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/sqlapi', userApi)
// 监听端口
app.listen(3000)
console.log('success listen at port:3000')
