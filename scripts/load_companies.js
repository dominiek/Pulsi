
sys = require('sys');
assert = require('assert');
child_process = require('child_process')

require.paths.unshift(__dirname + '/../lib');
var db = require('db');
var activity = require('activity');

function jsonForCommand(command, arguments, callback) {
  var stdout = "", stderr = "";
  var ls = child_process.spawn(command, arguments);
  
  ls.stdout.on('data', function (data) {
    if (data !== null) {
        stdout += data;
    }
  });

  ls.stderr.on('data', function (data) {
    sys.print('stderr: ' + data);
  });

  ls.on('exit', function (code) {
          callback(stdout);
  });

};

var determineShares = function(storage) {
  var companyIdentifier = Object.keys(storage.companies);
  for(var k=0; companyIdentifier.length>k; k++) {
    var identifier = companyIdentifier[k];
    storage.companies[identifier].start_value = 70;
    storage.companies[identifier].current_value = 70;
  }
};


var fetchDataForCompany = function(company, callback) {
  sys.puts("Fetching data for "+company.name);
  jsonForCommand("ruby", ["scripts/twitter_trends.rb", company.name.toLowerCase()], function(twitter_mentions_json) {
    company.twitter_mentions = JSON.parse(twitter_mentions_json)
    jsonForCommand("ruby", ["scripts/alexa_history.rb", company.domain.toLowerCase()], function(traffic_json) {
      company.traffic = JSON.parse(traffic_json)
      callback(company);
    });
  });
};

var fetchData = function(storage, callback) {
  var companyIdentifier = Object.keys(storage.companies);
  var jobs = [];
  
  var doOne = function() {
    if(jobs.length == 0) {
      callback(storage.companies);
      return;
    }
    var job = jobs.shift();
    fetchDataForCompany(job, function(company) {
      storage.companies[company.identifier] = company;
      doOne();
    });
  };
  
  for(var k=0; companyIdentifier.length>k; k++) {
    var identifier = companyIdentifier[k];
    jobs.push(storage.companies[identifier]);
  }

  doOne();
};

db.load(function(storage) {
  storage.companies = {};
  storage.companies['techcrunch'] = {identfier: 'techcrunch', name: 'Techcrunch', domain: "techcrunch.com"};
  storage.companies['dropbox'] = {name: "Dropbox", identifier: "dropbox", domain: "dropbox.com"};
  storage.companies['facebook'] = {name: "Facebook", identifier: "facebook", domain: "facebook.com"};
  storage.companies['twitter'] = {name: "Twitter", identifier: "twitter", domain: "twitter.com"};
  storage.companies['mashable'] = {name: "Mashable", identifier: "mashable", domain: "mashable.com"};
  storage.companies['evernote'] = {name: "Evernote", identifier: "evernote", domain: "evernote.com"};
  storage.companies['last-fm'] = {name: "Last.fm", identifier: "last-fm", domain: "last.fm"};
  storage.companies['github'] = {name: "Github", identifier: "github", domain: "github.com"};
  storage.companies['linkedin'] = {name: "LinkedIn", identifier: "linkedin", domain: "linkedin.com"};
  storage.companies['youtube'] = {name: "Youtube", identifier: "youtube", domain: "youtube.com"};
  storage.companies['37signals'] = {name: "37signals", identifier: "37signals", domain: "37signals.com"};
  storage.companies['skype'] = {name: "Skype", identifier: "skype", domain: "skype.com"};
  determineShares(storage);
  fetchData(storage, function() {
    db.store(function() {
      sys.puts("OK")
    });
  });
});