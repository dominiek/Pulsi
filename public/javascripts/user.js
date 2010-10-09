
var User = function() {
  
};

User.prototype.portfolio = function(username, callback) {
  callback([
    {company_identifier: 'dropbox', num_shares: 10}
  ]);
};

var user = new User();