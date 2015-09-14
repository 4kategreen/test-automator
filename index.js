var express = require('express'),
    fileEdit = require('./packages/file-edit/index'),
    http = require('http'),
    jade = require('jade'),
    path = require('path'),
    reload = require('reload');

var app = express(),
    viewPath = path.join(__dirname, 'views'),
    server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', viewPath);
app.set('view engine', 'jade');

app.get('/', function(req,res) {
  fileEdit.getDirectoryList('.')
    .then(fileEdit.parseDirectory)
    .then(function(files) {
      res.render('main', { files: files });
    })
    .fail(function(err) {
      console.log('Error: ' + err);
    })
    .done();
});

app.get('/file/:file', function(req,res) {
  fileEdit.readFile(req.params.file)
    .then(function(content) {
      res.render('file-edit', { content: content, file: req.params.file });
    })
    .done();
})

var waitForServer = true;
reload(server,app, waitForServer);

server.listen(app.get('port'), function () {
  var port = server.address().port,
      date = new Date(Date.now());

  console.log(date.toLocaleTimeString() + ' Example app listening at http://localhost:%s', port);
});

