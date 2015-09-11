var express = require('express'),
    fileEdit = require('file-edit'),
    http = require('http'),
    path = require('path'),
    reload = require('reload');

var app = express(),
    viewPath = path.join(__dirname, 'views'),
    server = http.createServer(app);

app.set('port', process.env.PORT || 3000)

app.get('/', function(req,res) {
  var structure = {},
      response;

  fileEdit.getDirectoryList('.')
    .then(fileEdit.parseDirectory)
    .then(function(files) {
      var fileCount = files.length;
      // console.log(files);

      response = '<h2>stats:</h2><ul>';
      for (var i=0;i<fileCount;i++) {
        response+= '<li>' + files[i].name + '(' + files[i].type + ')</li>';
      }
    
      response+= '</ul>';

      res.send(response);
    })
    .fail(function(err) {
      console.log('Error: ' + err);
    })
    .done();
});

var waitForServer = true;
reload(server,app, waitForServer);

server.listen(app.get('port'), function () {
  var port = server.address().port,
      date = new Date(Date.now());

  console.log(date.toLocaleTimeString() + ' Example app listening at http://localhost:%s', port);
});

