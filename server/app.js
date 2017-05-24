var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var dataImg;

fs.readdir('build/img', function(err, file) {
  if (err) {
    console.log(err);
    throw new Error('wrong file');
  } else {
    console.log(file);
    // dataImg = JSON.stringify(file);
    dataImg = file;
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.resolve('build/index.html'));
});

app.get('/data', function (req, res) {
  res.send(dataImg);
});

app.use(express.static('build'));


app.listen(5000, function () {
  console.log('App listening on port 3000!');
});

exports.app;
