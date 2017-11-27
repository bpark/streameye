var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var expressWs = require('express-ws')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/config', function(req, res){
  fs.readFile('bin/config.json', function(err, data) {
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

app.ws('/echo', function(ws, req) {
  var messsages = [
    '[{"name":"MoleculeMan","age":29,"secretIdentity":"DanJukes","powers":["Radiationresistance","Turningtiny","Radiationblast"]},{"name":"MadameUppercut","age":39,"secretIdentity":"JaneWilson","powers":["Milliontonnepunch","Damageresistance","Superhumanreflexes"]}]',
    '{"squadName":"Superherosquad","homeTown":"MetroCity","formed":2016,"secretBase":"Supertower","active":true,"members":[{"name":"MoleculeMan","age":29,"secretIdentity":"DanJukes","powers":["Radiationresistance","Turningtiny","Radiationblast"]},{"name":"MadameUppercut","age":39,"secretIdentity":"JaneWilson","powers":["Milliontonnepunch","Damageresistance","Superhumanreflexes"]},{"name":"EternalFlame","age":1000000,"secretIdentity":"Unknown","powers":["Immortality","HeatImmunity","Inferno","Teleportation","Interdimensionaltravel"]}]}'
  ];
  var count = 0;
  ws.on('message', function (msg) {
    var id = setInterval(function () {
      var rnd = Math.random();
      var index = 0;
      if (rnd > 0.5) {
        index = 1;
      }
      ws.send(messsages[index]);
      if (count++ > 200) {
        count = 0;
        clearInterval(id)
      }
    }, 20);
  })
});

app.listen(3000);
