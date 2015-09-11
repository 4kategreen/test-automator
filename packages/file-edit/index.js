var fs = require('fs'),
    Q = require('q');


var FileEdit = function() {
  structure = [];
};

FileEdit.prototype.getDirectoryList = function getDirectoryList(path) {
  var deferred = Q.defer();

  fs.readdir(path, function(err, files) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(files);
    }
  });

  return deferred.promise;
};

FileEdit.prototype.parseDirectory = function parseDirectory(files) {
  var _this = this;

  for (var i=0;i<files.length;i++) {
    setFileAttrs(files[i]).then(function(file) {
      _this.structure.push(file);
    }).catch(function(err)  {
      console.log('Error: ' + err);
    }).done();
  }

  console.log(_this.structure);
  return _this.structure;
};

var setFileAttrs = function setFileAttrs(file) {
  var deferred = Q.defer(),
      type;

  fs.stat(file,function(err,stat) {
    if (stat.isFile()) {
      type = "file";
    } else if (stat.isDirectory()) {
      type = "directory";
    } else {
      type = "unknown";
    }

    fileAttrs = {
      name: file,
      type: type
    }

    deferred.resolve(fileAttrs);
  });

  return deferred.promise;
};

module.exports = new FileEdit();