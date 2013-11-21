
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'gratify',
  user     : 'root',
  password : '123',
});


connection.connect();

connection.on('error', function() {
	connection.end();	
});


module.exports.createCategory = function(data, id, cb) {
	var q = connection.query('UPDATE category SET ? WHERE id = ' + connection.escape(id), data, function(){
		console.log(q.sql);
		connection.query(q.sql, cb);
	});
}

module.exports.createCategory = function(data, cb) {
	var q = connection.query('INSERT INTO category SET ?', data, function(){
		console.log(q.sql);
		connection.query(q.sql, cb);
	});
}

module.exports.deleteCategory = function(id, cb){
	var sql = 'DELETE from category where id = ' + connection.escape(id);
	connection.query(sql, cb);
}

module.exports.updateCategory = function(id, cb){
	var sql = 'DELETE from category where id = ' + connection.escape(id);
	connection.query(sql, cb);
}

