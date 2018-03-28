const db = require('../mysql')

/**
 * 登录
 * jtchen 2018/3/27
 */
exports.login = function(req, res) {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    console.log(userName,passWord)

    let sql_login = `SELECT * FROM test WHERE name = '${userName}' and password = '${passWord}' `;
    db.query(sql_login)
        .then(rows => {
            console.log('查询结果:',rows);
            if(rows.length == 0 || !rows){
                res.json('登录失败,请检查用户名和密码')
            }else{
                let response = {
                    state: 200,
                    info: "登录成功"
                };
                res.json(response)
            }
        })
        .catch(err => {
            throw err
        })
}