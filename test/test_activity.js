
sys = require('sys');
assert = require('assert');

require.paths.unshift(__dirname + '/../lib');
var db = require('db');
var activity = require('activity');

db.fetchCompany('techcrunch', function(company) {
  activity.synthesize(company);
  //sys.puts(sys.inspect(company.activity))
});
