const db = require('../sql/mysql');
const app = require('../app.js');
const jwt = require('jwt-simple');
const moment = require('moment')

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
                return res.json({
                    state: false,
                    info: "登录失败,请检查用户名和密码",
                })
            }else{
                let expires = moment().add('days',7).valueOf();
                let token = jwt.encode({
                    iss: rows[0].u_id,
                    exp: expires
                }, app.get('jwtTokenSecret'));

                console.log('颁发的token:'+ token)

                //saveToken(rows[0].u_id,token)

                return res.json({
                    userId: rows[0].u_id,
                    userName: rows[0].u_name,
                    email: rows[0].u_email,
                    address: rows[0].u_address,
                    tel: rows[0].u_tel,
                    access_token: token,
                    state: true,
                    info: "登录成功",
                })
            }
        })
        .catch(err => {
            throw err
        })
}

//非必须
function saveToken(u_id, token) {

    db.query(`SELECT * FROM token`)
        .then(rows => {
            if(rows.length === 1){
                db.query(`UPDATE token SET access_token='${token}', u_id=${u_id} WHERE t_id=1`)
                    .then(rows => {
                        console.log('更新token成功')
                    })
            }else{
                let sql_saveToken = `INSERT INTO token(u_id,access_token) VALUES (?,?) `;
                db.query(sql_saveToken,[u_id, token])
                    .then(rows => {
                        console.log('插入token成功')
                    })
            }
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


