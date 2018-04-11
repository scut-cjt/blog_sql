// Mysql class

class MDB {
    //构造函数
    constructor(hostname,username,passwd,dbport,dbname) {
        this.sql = '';
        this.result = '';
        this.err = '';

        let mysql = require('mysql');
        this.pool = mysql.createPool({
            host: hostname,
            user: username,
            password: passwd,
            port: dbport,
            database: dbname
        })
    }
    excute(){   //执行
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                }
                connection.query(this.sql, (err, result) => {
                    //释放连接
                    connection.release();
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                });
            });
        })
    }
    find(table,field='*',where='1'){
        this.sql = 'SELECT ' + field + ' FROM ' + table + ' where ' + where;
        //查
        //console.log('查询'+this.sql);
        return this.excute()
    }
    orderBy(){

    }
    limit(){
        
    }
    update(table,data,where){
        var sql = '';
        var params = [];
        for(var item in data) {
            sql = sql + item + " = \'" + data[item] + "\' ,";
            
        }
        var len = sql.length-1;
        sql = sql.substring(0,len);

        this.sql = 'UPDATE ' + table + ' SET ' + sql + ' WHERE '+ where;

        return this.excute();

    }

    insert(table,data){
        var sql = '';
        var val = '';
        for(var item in data) {
            sql = sql + item + ",";
            val = val + "\'" + data[item] + "\' ,";
            
        }
        var len = sql.length-1;
        var len2 = val.length-1;
        sql = sql.substring(0,len);
        val = val.substring(0,len2);

        this.sql = 'INSERT INTO ' + table + '(' + sql + ') VALUES(' + val + ')';
        return this.excute();
        
    }

    delete(table,where){
        this.sql = 'DELETE FROM ' + table + ' where '+ where;
        //删
        return this.excute();
    }
    quit(){
        this.pool.end();
    }
    
     
     
}

const db = new MDB('127.0.0.1','root','1qaz@WSX','3306','app_blog')
// 实例化，方便建多库对象
//const db = new MDB('47.91.166.201','cjt','1qaz2wsx.',3306,'app_blog'); //远程

module.exports = db;

