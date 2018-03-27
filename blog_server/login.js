/**
 * 登录/注册接口
 * jtchen 2018/3/27
 */
const db = require('./mysql')


db.query("SELECT * FROM test ")
    .then(rows => {
        console.log(rows)
    })
