
var mysql      = require('mysql');


var connection = mysql.createConnection({
	  host     : 'localhost',
	  database : 'gratify',
	  user     : 'root',
	  password : '123'
});

connection.on('error', function(e) {
	console.log(e);
	connection.end();	
});

module.exports.getCategoryBy = function(id, cb) {
	var sql = 'SELECT * from category';
	if (id != 0) sql +=  ' where parentId = ' + connection.escape(id);

	connection.query(sql, function(err, rows, fields) {
		if (err) {
			cb(err);
		}
		else {
			cb(null, rows);
		}
	});
}