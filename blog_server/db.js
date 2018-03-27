const db = require('./mysql')

db.query('select * from test')
    .then(rows => {
        console.log('======查询完成=======');
        console.log(rows);

        return db.query('update test set name = ?, password = ?, age = ? where id =?', ['lxy2', '123', 15, 2])
    })
    .then(rows => {
        console.log('======修改完成=======');
        console.log(rows.affectedRows);
    })