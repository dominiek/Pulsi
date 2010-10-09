
var Company = function() {
  
};

Company.prototype.browse = function(callback) {
  callback([
    {name: "Dropbox", identifier: "dropbox"},
    {name: "Facebook", identifier: "facebook"},
    {name: "Twitter", identifier: "twitter"},
    {name: "Techcrunch", identifier: "techcrunch"},
    {name: "Mashable", identifier: "mashable"},
    {name: "Evernote", identifier: "evernote"},
    {name: "Github", identifier: "github"},
    {name: "Last.fm", identifier: "lastfm"},
    {name: "LinkedIn", identifier: "linkedin"},
    {name: "Youtube", identifier: "youtube"},
    {name: "37Signals", identifier: "37signals"},
    {name: "Skype", identifier: "skype"},
  ]);
};

Company.prototype.info = function(identfier, callback) {
  callback({
    identfier: 'facebook',
    name: 'Facebook',
    description: "Big SNS",
    history: {
      'today': [
        {when: Date.now(), value: 2323},
        {when: Date.now(), value: 2323},
        {when: Date.now(), value: 2323},
        {when: Date.now(), value: 2323}
      ],
      'this_month': [
        {when: Date.now(), value: 2323},
        {when: Date.now(), value: 2323},
        {when: Date.now(), value: 2323},
        {when: Date.now(), value: 2323}
      ]
    },
    current_value: 2323
  });
};


Company.prototype.activity = function(identfier, callback) {
  callback([
    {type: 'buy', user: {}, when: Date.now(), num_shares: 3},
    {type: 'sell', user: {}, when: Date.now(), num_shares: 2},
    {type: 'tweet', user: {}, when: Date.now(), text: "This is the shit"},
  ]);
};

Company.prototype.crunchbaseInfo = function(identfier, callback) {
  //See: http://api.crunchbase.com/v/1/company/facebook.js
};

var company = new Company();