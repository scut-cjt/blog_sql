const db = require('../sql/mysql.class');
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

    db.insert('article',{
        'a_title': title,
        'a_content': content,
        'a_date': date,
        'u_name': userName,
        'u_id': userId
    })
        .then(res => {
            return Promise.resolve(res.insertId)
        })
        .then(insertId => {
            db.find('article', '*', `a_id = '${insertId}'`)
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
    let where = 1;

    if(userId != ''){
       where = `a_id = '${insertId}'`;
    }

    db.joinGroup(['article','comments'], '*', 'comments.a_id', 'article.a_id = comments.a_id', 'article.a_id', 'article.a_id')
    //db.find('article','*',where)
        .then(rows => {
            //console.log(rows);
            let response = {
                state: true,
                info:'查询成功',
                list: rows,
            }

            return res.json(response)
        })

}

/**
 * 查看文章详情
 * jtchen 2018/4/9
 */
exports.checkArticle = function(req, res) {
    let articleId = req.body.articleId ;

    if(articleId == ''){
        return res.json({
            errcode:'400',
            info:'请传入文章id'
        })
    }

    db.find('article', '*', 'a_id =' + articleId)
        .then(rows => {
            console.log(rows);
            let response = {
                state: true,
                info:'查询成功',
                detail: rows[0],
            }

            return res.json(response)
        })

}