var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    reload = require('reload');

var app = express(),
    server = http.createServer(app);

app.get('/', function(req,res) {
  var structure = {};

  fs.readdir('.', function(err, files) {
    var response = '';

    if (err) {
      throw err;
    }

    response+= '<h2>stats:</h2><ul>';
    for (var i=0;i<files.length;i++) {
      fs.stat(files[i],function(err,stat) {
        structure[files[i]] = {};
        file = structure[files[i]];
        file.name = files[i];

        if (stat.isFile()) {
          file.type = "file";
        } else if (stat.isDirectory()) {
          file.type = "directory";
        } else {
          file.type = "unknown";
        }
      });
      response+= '<li>' + files[i] + '</li>';
    }
    response+= '</ul>';

    res.send(response);
  });
});

var waitForServer = true;
reload(server,app, waitForServer);

server.listen(3000, function () {
  var port = server.address().port,
      date = new Date(Date.now());

  console.log(date.toLocaleTimeString() + ' Example app listening at http://localhost:%s', port);
});

// requires fs
var FileRead = {};

FileRead.prototype.getDirectoryList = function getDirectoryList(path) {
  fs.readdir('.', function(err, files) {
    if (err) {
      throw err;
    } else {
      return files;
    }
  });
};