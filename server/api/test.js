const db = require('../sql/mysql.class');

module.exports = (req, res) => {
   db.find('article','a_id, a_title','a_id >= 27').then( result => {
       console.log('结果:'+ result)
       return res.json(result)
   })
}

// db.insert('test',{'data':'inse','data2':'inse'});

// db.update('test',{'data':'up','data2':'upd'},'id=9');

// db.delete('test','id=9');
