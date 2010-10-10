var crunchbaseUrl = 'http://api.crunchbase.com/';


var Companies = function() {
  
};

Companies.prototype.browse = function(callback) {
  $.get('/companies.json', function(response) {
    callback(response.companies);
  }, 'json');
};

Companies.prototype.info = function(identfier, callback) {
  $.get('/companies/'+identfier+'.json', function(response) {
    callback(response.company);
  }, 'json');
};


Companies.prototype.activity = function(identfier, callback) {
  callback([
    {type: 'buy', user: {}, when: Date.now(), num_shares: 3},
    {type: 'sell', user: {}, when: Date.now(), num_shares: 2},
    {type: 'tweet', user: {}, when: Date.now(), text: "This is the shit"},
  ]);
};

Companies.prototype.crunchbaseInfo = function(identfier, callback) {
  $.getJSON('http://api.crunchbase.com/v/1/company/'+identfier+'.js?callback=?', function(response) {
    callback(response);
  });
};

Companies.prototype.subscribe = function(username, identfier, callback) {
  socket = new io.Socket('localhost');
  socket.connect();
  socket.send($.toJSON({action: 'initialize', username: username}));
  socket.send($.toJSON({action: 'subscribe', company_identifier: identfier}));
  socket.on('message', function(response){
    response = $.evalJSON(response);
    callback(response);
  });
};

var companies = new Companies();