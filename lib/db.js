
fs = require('fs');

DB = {
  'companies': {},
  'users': {}
};

DB_FILE = __dirname + '/../data/development.db';

exports.newUser = function(username) {
  var user = {};
  user.username = username;
  user.balance = 15000;
  user.created_at = new Date();
  user.investments = {};
  return user;
};

exports.load = function(callback) {
  fs.readFile(DB_FILE, function (err, data) {
    if(err) {
      sys.puts("Could not open file "+DB_FILE+" starting with new one.")
      callback(DB);
      return;
    }
    DB = JSON.parse(data);
    callback(DB);
  }); 
};

exports.store = function(callback) {
  fs.writeFile(DB_FILE, JSON.stringify(DB), function (err) {
    if(err) {
      throw err;
    }
    callback(DB);
  });
};

exports.fetchCompany = function(identifier, callback) {
  exports.load(function(storage) {
    callback(storage.companies[identifier]);
  });
};

exports.fetchUser = function(identifier, callback) {
  exports.load(function(storage) {
    callback(storage.users[identifier]);
  });
};

