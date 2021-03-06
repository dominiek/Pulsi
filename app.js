
//require.paths.unshift(__dirname + '/lib/support/socketio/lib')
require.paths.unshift(__dirname + '/lib')
sys = require('sys')
var express = require('express'),
    connect = require('connect'),
    auth    = require('connect-auth');
var db = require('db');
var activity = require('activity');
var io = require('./lib/support/socketio/lib/socket.io');    

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

process.on('uncaughtException', function (err) {
  sys.puts('!!! Uncaught exception: ' + err);
});

var ACTIVE_CLIENTS = {};
    
var respondWithCallback = function (req, res, object) {
  callback = req.param('callback') || req.param('cb')
  if(callback) {
    res.send(callback+"("+JSON.stringify(object)+");", { 'Content-Type': 'text/plain' }, 200)
  } else {
    res.send(JSON.stringify(object), { 'Content-Type': 'text/plain' }, 200)
  }
};

app.get('/', function(req, res){
  res.redirect('/dashboard.html')
});

app.get('/companies.json', function(req, res){
  var companies = [];
  db.load(function(storage) {
    companyIdentfiers = Object.keys(storage.companies);
    for(var k=0; companyIdentfiers.length>k; k++) {
      var company = storage.companies[companyIdentfiers[k]];
      var lcompany = {identifier: companyIdentfiers[k], name: company.name, current_value: company.current_value};
      companies.push(lcompany);
    }
    respondWithCallback(req, res, {companies: companies});
  });
});

app.get('/companies/:identifier.json', function(req, res) {
  db.fetchCompany(req.param('identifier'), function(company) {
    activity.synthesize(company);
    db.updateSharePriceFor(req.param('identifier'), company.activity[company.activity.length-1].value, function() {
      return respondWithCallback(req, res, {company: company});
    })
  });
});

app.get('/signin.json', function(req, res) {
  if(!req.param('username')) {
    return respondWithCallback(req, res, {error: "Need :username"}); 
  }
  db.load(function(storage) {
    var user = storage.users[req.param('username')];
    if(user) {
      return respondWithCallback(req, res, {user: user, is_new: false}); 
    } else {
      user = db.newUser(req.param('username'));
      storage.users[req.param('username')] = user;
      db.store(function() {
        respondWithCallback(req, res, {user: user, is_new: true}); 
      });
    }
  });
});

app.get('/buy.json', function(req, res) {
  if(!req.param('username')) {
    return respondWithCallback(req, res, {error: "Need :username"}); 
  }
  
  if(!req.param('company_identifier')) {
    return respondWithCallback(req, res, {error: "Need :company_identifier"}); 
  }

  if(!req.param('num_shares')) {
    return respondWithCallback(req, res, {error: "Need :num_shares"}); 
  }
  
  db.fetchUser(req.param('username'), function(user) {
    db.fetchCompany(req.param('company_identifier'), function(company) {
      var num_shares = parseInt(req.param('num_shares'));
      var costs = Math.round(num_shares * parseInt(company.current_value));
      if(costs > user.balance) {
        return respondWithCallback(req, res, {error: "Not enough balance! Sorry!"});
      }
      
      sys.puts("Diluting "+company.name+" based on current share price: $"+company.current_value)
      var activityObject = {what: "dilution", when: new Date()};
      activityObject.timestamp = activityObject.when-0;
      activityObject.raw_value = num_shares;
      activityObject.value = company.current_value;
      activity.augmentValueByEvent(company, activityObject);
      
      var activeUsernames = Object.keys(ACTIVE_CLIENTS);
      for(var k=0; activeUsernames.length>k; k++) {
        var client = ACTIVE_CLIENTS[activeUsernames[k]];
        if(client.company_identifier && client.company_identifier == req.param('company_identifier')) {
          client.send(JSON.stringify({action: 'activity', 'activityObject': activityObject}));
        }
      }
      
      
      var newBalance = user.balance - costs;
      var investment = {identifier: req.param('company_identifier'), num_shares: num_shares};
      db.investFor(req.param('username'), newBalance, investment, function(user) {
        return respondWithCallback(req, res, {ok: "Shares purchased.", user: user});
      });
      
    });
  });
  
});

db.load(function() {
  db.store(function() {
    sys.puts("Database initialized")
  });
});

sys.puts("Running on http://localhost:6008/");
app.listen(6008);

var socket = io.listen(app); 
socket.on('connection', function(client){
  client.username = null;
  
  client.on('message', function(message){
    var command = JSON.parse(message);
    sys.puts("Received command: "+sys.inspect(command))
    
    if(command.action == 'initialize') {
      ACTIVE_CLIENTS[command.username] = client;
      client.username = command.username;
      sys.puts("Connectees: "+sys.inspect(Object.keys(ACTIVE_CLIENTS)))
    }
    if(command.action == 'subscribe') {
      ACTIVE_CLIENTS[client.username].company_identifier = command.company_identifier;
    }
  }) 
  client.on('disconnect', function(){
    ACTIVE_CLIENTS[client.username] = null;
    delete ACTIVE_CLIENTS[client.username];
    sys.puts("Connectees: "+sys.inspect(Object.keys(ACTIVE_CLIENTS)))
  }) 
});