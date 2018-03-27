/**
 * promise版 sql连接池
 * jtchen 2018/3/27
 */

const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1qaz@WSX',
    port: 3306,
    database: 'app_blog'
})

exports.query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(sql, params, (err, result) => {
                //释放连接
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
};