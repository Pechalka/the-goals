var express = require('express')
    , http = require('http')
    , path = require('path');

var app = express();

app.use(express.urlencoded())
app.use(express.json())
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



http.createServer(app).listen(3000, function(){
    console.log('Express server listening on port 3000');
});
