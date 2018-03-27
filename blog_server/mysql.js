/**
 * 数据库连接池
 * jtchen 2018/3/27
 */

var mysql = require('mysql');

/**
 * 创建连接
 * jtchen 2018/3/27
 */
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1qaz@WSX',
    port: 3306,
    database: 'app_blog'
})

/**
 * 打开数据库
 * jtchen 2018/3/27
 */
db.connect(err => {
    if(err){
        console.log('[query] - '+err);
        return
    }
    console.log('[db connect] success')
})

/**
 * 查询
 * jtchen 2018/3/27
 */
let query_sql = 'select * from test';
db.query(query_sql, function(error,result){
    if(error)
        console.log(error.message);
    else{
        console.log("================查询结果================");
        console.log(result);
    }
})

/**
 * 插入
 * jtchen 2018/3/27
 */
let insert_sql = 'insert into test(id,name,age,password) values(?,?,?,?)';
let insert_param = [101,'test_user_01',18,'123'];
db.query(insert_sql, insert_param, function(error, result){
    if(error)
        console.log(error.message);
    else{
        console.log("================插入结果================");
        console.log('[db insert success! ]insert id: '+result.insertId);
    }
});

/**
 * 修改
 * jtchen 2018/3/27
 */
let update_sql = "update test set name = ?, password = ?, age = ? where id =?";
let update_param = ['lxy2', '123456', 15, 2];
db.query(update_sql, update_param, (err,res) => {
    if(err)
        console.log(err.message);
    else{
        console.log("================修改结果================");
        console.log(res.affectedRows);
    }
})

/**
 * 删除
 * jtchen 2018/3/27
 */
let delet_sql = "delete from test where id = 102";
db.query(delet_sql, (err,res) => {
    if(err)
        console.log(err.message);
    else{
        console.log("================删除结果================");
        console.log(res.affectedRows);
    }
})



/**
 * 关闭数据库
 * jtchen 2018/3/27
 */
db.end(err => {
    if(err){
        console.log('[query] - '+err);
        return
    }
    console.log('[db end] success')
})