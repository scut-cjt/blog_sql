const db = require('../mysql');
const moment = require("moment")

/**
 * 发布文章
 * jtchen 2018/4/8
 */
exports.newArticle = function(req, res) {
    let title = req.body.title;
    let content = req.body.content;
    let date = moment().format("YYYY-MM-DD HH:MM:SS");
    console.log(title,content,date)

    let insert_sql = "INSERT INTO article(a_title, a_content, a_date) VALUES (?,?,?)";
    let insert_params = [title,content,date];
    db.query(insert_sql,insert_params)
        .then(res => {
            console.log(res)
            //拿到insertId去查
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

}