
var Users = function() {
  
};

Users.prototype.current = function(callback) {
  var username = localStorage.getItem('username');
  this.fetch(username, function(user) {
    callback(user);
  });
};

Users.prototype.fetch = function(username, callback) {
  $.get('/signin.json?username='+username, function(response) {
    callback(response.user);
  }, 'json')
};

Users.prototype.buy = function(company_identifier, num_shares, callback) { var self = this;
  self.current(function(user) {
    $.get('/buy.json?username='+user.username+'&company_identifier='+company_identifier+'&num_shares='+num_shares, function(response) {
      if(response.error) {
        alert("Error: "+response.error);
      } else {
        callback();
      }
    }, 'json');
  });
};

var users = new Users();