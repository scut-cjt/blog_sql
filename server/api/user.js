const db = require('../sql/mysql.class');
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

    db.find('users','*',`u_name = '${userName}' and u_password = '${passWord}'`)
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


/**
 * 注册
 * jtchen 2018/3/27
 */
exports.register = function(req, res) {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    console.log(userName,passWord)

    db.find('users', '*', `u_name = '${userName}'`)
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


