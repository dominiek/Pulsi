
var Users = function() {
  
};

Users.prototype.portfolio = function(username, callback) {
  callback([
    {company_identifier: 'dropbox', num_shares: 10}
  ]);
};

var users = new Users();