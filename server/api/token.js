const app = require('../app.js');
const jwt = require('jwt-simple');

module.exports = function(req, res, next) {

    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    console.log(token)

    if (token) {
        try {
            let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
            console.log(decoded)
            if (decoded.exp <= Date.now()) {
                //如果token过期了，我们就拒绝它
                return res.json({
                    state: false,
                    errcode: '400',
                    info: '过期的token'
                })
            }

            //token依旧合法
            req.userId = decoded.iss;
            next();

        } catch (err) {
            console.log(3)
            return res.json({
                state: false,
                info: 'token错误,请检查请求头'
            })
        }
    } else {
        console.log(4)
        return res.json({
            state: false,
            errcode: '400',
            info: '您没有该权限,请先登录'
        })
    }

};