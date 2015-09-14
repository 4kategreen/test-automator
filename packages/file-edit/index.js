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

// This has to return _after_ all the promises are done.
FileEdit.prototype.parseDirectory = function parseDirectory(files) {
  var structure = [];

  return setFileAttrs(files);
};

var setFileAttrs = function setFileAttrs(files) {
  var results = [],
      type;

  for (var i=0;i<files.length;i++) {
    var fileName = files[i],
        fileAttrs;

    fileAttrs = fs.statSync(fileName);

    if (fileAttrs.isFile()) {
      type = "file";
    } else if (fileAttrs.isDirectory()) {
      type = "directory";
    } else {
      type = "unknown";
    }

    results.push({
      name: fileName,
      type: type
    });
  }

  return results;
};

module.exports = new FileEdit();