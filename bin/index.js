var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var expressWs = require('express-ws')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', function(req, res){
  fs.readFile('bin/single-response.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/api',function(req, res){
  /*var user_name=req.body.user;*/
  fs.readFile('bin/message.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

function intervalFunc(count) {
}

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    var i = 0;
    setInterval(function() {
      ws.send('' + i++);
    }, 10);
  });
});

app.listen(3000);
