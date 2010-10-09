
require.paths.unshift(__dirname + '/lib')
sys = require('sys')
var express = require('express'),
    connect = require('connect'),
    auth    = require('connect-auth');
var db = require('db');
var activity = require('activity');
    
    
var MemoryStore = require('connect/middleware/session/memory');

var app = express.createServer(
  connect.logger({ format: '=> :method :url (code :status, took :response-timems)' }),
  connect.bodyDecoder(),
  connect.methodOverride(),
  connect.errorHandler({ dumpExceptions: true, showStack: true }),
  connect.staticProvider(__dirname + '/public'),
  connect.cookieDecoder(),
  connect.session({ store: new MemoryStore({ reapInterval: 60000 * 10 }) })
);
    
var respondWithCallback = function (req, res, object) {
  callback = req.param('callback') || req.param('cb')
  if(callback) {
    res.send(callback+"("+JSON.stringify(object)+");", { 'Content-Type': 'text/plain' }, 200)
  } else {
    res.send(JSON.stringify(object), { 'Content-Type': 'text/plain' }, 200)
  }
};

app.get('/companies.json', function(req, res){
  var companies = [
    {name: "Dropbox", identifier: "dropbox"},
    {name: "Facebook", identifier: "facebook"},
    {name: "Twitter", identifier: "twitter"},
    {name: "Techcrunch", identifier: "techcrunch"},
    {name: "Mashable", identifier: "mashable"},
    {name: "Evernote", identifier: "evernote"},
    {name: "Github", identifier: "github"},
    {name: "Last.fm", identifier: "last-fm"},
    {name: "LinkedIn", identifier: "linkedin"},
    {name: "Youtube", identifier: "youtube"},
    {name: "37Signals", identifier: "37signals"},
    {name: "Skype", identifier: "skype"},
  ];
  respondWithCallback(req, res, {companies: companies});
});

app.get('/companies/:identifier.json', function(req, res) {
  db.fetchCompany(req.param('identifier'), function(company) {
    activity.synthesize(company);
    return respondWithCallback(req, res, {company: company});
  });
});

app.post('/signin', function(req, res) {
  if(!req.param('username')) {
    return respondWithCallback(req, res, {error: "Need :username"}); 
  }
  db.load(function(storage) {
    var user = storage.users[req.param('username')];
    if(user) {
      return respondWithCallback(req, res, {user: user}); 
    } else {
      user = db.newUser();
      storage.users[req.param('username')] = user;
      db.store(function() {
        respondWithCallback(req, res, {user: user}); 
      });
    }
  });
});

app.post('/buy', function(req, res) {
  if(!req.param('company_identifier')) {
    return respondWithCallback(req, res, {error: "Need :company_identifier"}); 
  }

  if(!req.param('num_shares')) {
    return respondWithCallback(req, res, {error: "Need :num_shares"}); 
  }
});

sys.puts("Running on http://localhost:6008/");
app.listen(6008);