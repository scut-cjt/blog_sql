const db = require('../mysql')

/**
 * 登录
 * jtchen 2018/3/27
 */
exports.login = function(req, res) {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    console.log(userName,passWord)

    let sql_login = `SELECT * FROM users WHERE u_name = '${userName}' and u_password = '${passWord}' `;
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

/**
 * 注册
 * jtchen 2018/3/27
 */
exports.register = function(req, res) {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    console.log(userName,passWord)

    let sql_register = `SELECT * FROM users WHERE u_name = '${userName}'`;
    db.query(sql_register)
        .then(rows => {
            console.log('查询结果:',rows);
            if(rows.length == 0 || !rows){
                let insert_sql = "INSERT INTO users(u_name,u_password) VALUES (?,?)";
                let insert_params = [userName,passWord];
                db.query(insert_sql,insert_params)
                    .then(rows => {
                        let response = {
                            state: 200,
                            info: "注册成功"
                        };

                        res.json(response);
                    })

            }else{
                res.json('用户名已存在')
            }
        })
        .catch(err => {
            throw err
        })
}
