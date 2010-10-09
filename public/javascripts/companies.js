
var Companies = function() {
  
};

Companies.prototype.browse = function(callback) {
  $.get('/companies.json', function(response) {
    callback(response.companies);
  }, 'json');
};

Companies.prototype.info = function(identfier, callback) {
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
    current_value: 2323,
    traffic: [{"page_views":46300.0,"day":"2010-09-07","reach":357500},{"page_views":46980.0,"day":"2010-09-08","reach":359600},{"page_views":47270.0,"day":"2010-09-09","reach":358900},{"page_views":48220.0,"day":"2010-09-10","reach":359600},{"page_views":53110.0,"day":"2010-09-11","reach":361400},{"page_views":54220.0,"day":"2010-09-12","reach":365500},{"page_views":47180.0,"day":"2010-09-13","reach":362200},{"page_views":47030.0,"day":"2010-09-14","reach":359600},{"page_views":44010.0,"day":"2010-09-15","reach":358600},{"page_views":43610.0,"day":"2010-09-16","reach":358200},{"page_views":45330.0,"day":"2010-09-17","reach":357700},{"page_views":49510.0,"day":"2010-09-18","reach":357700},{"page_views":49920.0,"day":"2010-09-19","reach":366200},{"page_views":43770.0,"day":"2010-09-20","reach":361900},{"page_views":44970.0,"day":"2010-09-21","reach":362299},{"page_views":45800.0,"day":"2010-09-22","reach":362600},{"page_views":45370.0,"day":"2010-09-23","reach":364500},{"page_views":46660.0,"day":"2010-09-24","reach":364500},{"page_views":48540.0,"day":"2010-09-25","reach":360500},{"page_views":51920.0,"day":"2010-09-26","reach":365500},{"page_views":44870.0,"day":"2010-09-27","reach":364500},{"page_views":45490.0,"day":"2010-09-28","reach":367800},{"page_views":45590.0,"day":"2010-09-29","reach":363200},{"page_views":44500.0,"day":"2010-09-30","reach":362200},{"page_views":46450.0,"day":"2010-10-01","reach":363300},{"page_views":48670.0,"day":"2010-10-02","reach":362000},{"page_views":50250.0,"day":"2010-10-03","reach":367299},{"page_views":43270.0,"day":"2010-10-04","reach":364300},{"page_views":44330.0,"day":"2010-10-05","reach":363100},{"page_views":45920.0,"day":"2010-10-06","reach":364200},{"page_views":44970.0,"day":"2010-10-07","reach":363500}]
  });
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

var companies = new Companies();