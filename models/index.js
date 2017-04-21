var mongoose      = require('mongoose');
var async         = require('async');
var event_emitter = new (require('events').EventEmitter);
var fs            = require('fs');
var _             = require('lodash');

var models_cache = {};

module.exports = function(host, callback) {

  if (models = models_cache[host]) return callback(null, models);

  event_emitter.on(host, function(models) {
    console.log(host, 'event on');
    callback(null, models);
  });

  fs.readdir(__dirname, function(err, files) {

    mongoose.Promise = global.Promise;
    connection = mongoose.createConnection('mongodb://ky1:123@localhost:27017/questionnaire');

    var models = files.reduce(function(models, file) {
      if (!fs.statSync(__dirname + '/' + file).isDirectory()) {
        return models;
      }
      if (file === 'Shared') {
        return models;
      }
      if (/^\./.test(file)) {
        return models;
      }

      model = connection.model(file, require('./' + file + '/index.js'));
      models[file] = model
      return models
    }, {});

    tasks = (function() {
      var results = [];
      for (key in models) {
        model = models[key];
        if (model.cache) {
          results.push(model.cache.bind(model));
        }
      }
      return results;
    })();

    async.parallel(tasks, function(error) {
      if (error) return callback(error);
      event_emitter.emit(host, models_cache[host] = models);
    });
  });
};
