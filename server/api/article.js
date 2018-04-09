const db = require('../mysql');
const moment = require("moment")

/**
 * 发布文章
 * jtchen 2018/4/8
 */
exports.newArticle = function(req, res) {
    let title = req.body.title;
    let content = req.body.content;
    let userName = req.body.userName;
    let userId = req.body.userId;
    let date = moment().format("YYYY-MM-DD HH:MM:SS");

    let insert_sql = "INSERT INTO article(a_title, a_content, a_date, u_name, u_id) VALUES (?,?,?,?,?)";
    let insert_params = [title,content,date,userName,userId];
    db.query(insert_sql,insert_params)
        .then(res => {
            //拿到insertId去查(文章id)
            console.log('id',res.insertId)
            return Promise.resolve(res.insertId)
        })
        .then(insertId => {
            let query_sql = `SELECT * FROM article WHERE a_id = '${insertId}'`;
            db.query(query_sql)
                .then(rows => {
                    console.log('文章查询:',rows)
                    let response = {
                        state: true,
                        text: "新建文章成功",
                        articleId: rows[0].a_id,
                        userId: rows[0].u_id,
                        title: rows[0].a_title,
                        info: rows[0].a_info,
                        praise: rows[0].praise_num,
                        comment: rows[0].comment_num,
                        articleClass: rows[0].a_class,
                        date: rows[0].a_date
                    };

                    return res.json(response);
                })
        })
        .catch(err => {
            throw err
        })

}

/**
 * 获取文章列表
 * jtchen 2018/4/8
 */
exports.getArticleList = function(req, res) {
    let userId = req.body.userId || '' ;
    let query_sql;

    if(userId != ''){
        query_sql = `SELECT * FROM article WHERE a_id = '${insertId}'`;
    }else{
        query_sql = `SELECT * FROM article`;
    }

    db.query(query_sql)
        .then(rows => {
            console.log(rows);
            let response = {
                state: true,
                info:'查询成功',
                list: rows,
            }

            return res.json(response)
        })

}
