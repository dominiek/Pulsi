
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
    traffic: [{"page_views":46300.0,"day":"2010-09-07","reach":357500},{"page_views":46980.0,"day":"2010-09-08","reach":359600},{"page_views":47270.0,"day":"2010-09-09","reach":358900},{"page_views":48220.0,"day":"2010-09-10","reach":359600},{"page_views":53110.0,"day":"2010-09-11","reach":361400},{"page_views":54220.0,"day":"2010-09-12","reach":365500},{"page_views":47180.0,"day":"2010-09-13","reach":362200},{"page_views":47030.0,"day":"2010-09-14","reach":359600},{"page_views":44010.0,"day":"2010-09-15","reach":358600},{"page_views":43610.0,"day":"2010-09-16","reach":358200},{"page_views":45330.0,"day":"2010-09-17","reach":357700},{"page_views":49510.0,"day":"2010-09-18","reach":357700},{"page_views":49920.0,"day":"2010-09-19","reach":366200},{"page_views":43770.0,"day":"2010-09-20","reach":361900},{"page_views":44970.0,"day":"2010-09-21","reach":362299},{"page_views":45800.0,"day":"2010-09-22","reach":362600},{"page_views":45370.0,"day":"2010-09-23","reach":364500},{"page_views":46660.0,"day":"2010-09-24","reach":364500},{"page_views":48540.0,"day":"2010-09-25","reach":360500},{"page_views":51920.0,"day":"2010-09-26","reach":365500},{"page_views":44870.0,"day":"2010-09-27","reach":364500},{"page_views":45490.0,"day":"2010-09-28","reach":367800},{"page_views":45590.0,"day":"2010-09-29","reach":363200},{"page_views":44500.0,"day":"2010-09-30","reach":362200},{"page_views":46450.0,"day":"2010-10-01","reach":363300},{"page_views":48670.0,"day":"2010-10-02","reach":362000},{"page_views":50250.0,"day":"2010-10-03","reach":367299},{"page_views":43270.0,"day":"2010-10-04","reach":364300},{"page_views":44330.0,"day":"2010-10-05","reach":363100},{"page_views":45920.0,"day":"2010-10-06","reach":364200},{"page_views":44970.0,"day":"2010-10-07","reach":363500}],
    twitter_mentions: [{"time":"2010-10-02 10:00:00-0700","num_tweets":"8"},{"time":"2010-10-02 12:00:00-0700","num_tweets":"20"},{"time":"2010-10-02 14:00:00-0700","num_tweets":"9"},{"time":"2010-10-02 16:30:00-0700","num_tweets":"30"},{"time":"2010-10-02 19:00:00-0700","num_tweets":"9"},{"time":"2010-10-02 21:00:00-0700","num_tweets":"11"},{"time":"2010-10-02 23:30:00-0700","num_tweets":"86"},{"time":"2010-10-03 02:30:00-0700","num_tweets":"22"},{"time":"2010-10-03 05:00:00-0700","num_tweets":"10"},{"time":"2010-10-03 07:00:00-0700","num_tweets":"13"},{"time":"2010-10-03 09:00:00-0700","num_tweets":"37"},{"time":"2010-10-03 11:00:00-0700","num_tweets":"48"},{"time":"2010-10-03 13:00:00-0700","num_tweets":"38"},{"time":"2010-10-03 15:00:00-0700","num_tweets":"25"},{"time":"2010-10-03 17:00:00-0700","num_tweets":"8"},{"time":"2010-10-03 19:00:00-0700","num_tweets":"0"},{"time":"2010-10-03 21:00:00-0700","num_tweets":"28"},{"time":"2010-10-03 23:30:00-0700","num_tweets":"101"},{"time":"2010-10-04 03:00:00-0700","num_tweets":"28"},{"time":"2010-10-04 06:00:00-0700","num_tweets":"8"},{"time":"2010-10-04 07:30:00-0700","num_tweets":"19"},{"time":"2010-10-04 09:00:00-0700","num_tweets":"57"},{"time":"2010-10-04 11:00:00-0700","num_tweets":"99"},{"time":"2010-10-04 13:00:00-0700","num_tweets":"89"},{"time":"2010-10-04 15:00:00-0700","num_tweets":"42"},{"time":"2010-10-04 17:00:00-0700","num_tweets":"40"},{"time":"2010-10-04 19:00:00-0700","num_tweets":"27"},{"time":"2010-10-04 21:30:00-0700","num_tweets":"15"},{"time":"2010-10-05 00:30:00-0700","num_tweets":"39"},{"time":"2010-10-05 03:30:00-0700","num_tweets":"58"},{"time":"2010-10-05 06:00:00-0700","num_tweets":"42"},{"time":"2010-10-05 08:00:00-0700","num_tweets":"110"},{"time":"2010-10-05 09:30:00-0700","num_tweets":"49"},{"time":"2010-10-05 11:00:00-0700","num_tweets":"71"},{"time":"2010-10-05 13:00:00-0700","num_tweets":"35"},{"time":"2010-10-05 15:00:00-0700","num_tweets":"59"},{"time":"2010-10-05 17:00:00-0700","num_tweets":"56"},{"time":"2010-10-05 19:00:00-0700","num_tweets":"32"},{"time":"2010-10-05 21:00:00-0700","num_tweets":"79"},{"time":"2010-10-05 23:00:00-0700","num_tweets":"49"},{"time":"2010-10-06 01:30:00-0700","num_tweets":"30"},{"time":"2010-10-06 04:30:00-0700","num_tweets":"93"},{"time":"2010-10-06 07:00:00-0700","num_tweets":"51"},{"time":"2010-10-06 08:30:00-0700","num_tweets":"83"},{"time":"2010-10-06 09:30:00-0700","num_tweets":"61"},{"time":"2010-10-06 11:00:00-0700","num_tweets":"117"},{"time":"2010-10-06 13:00:00-0700","num_tweets":"36"},{"time":"2010-10-06 15:00:00-0700","num_tweets":"9"},{"time":"2010-10-06 17:00:00-0700","num_tweets":"107"},{"time":"2010-10-06 19:00:00-0700","num_tweets":"28"},{"time":"2010-10-06 21:00:00-0700","num_tweets":"104"},{"time":"2010-10-06 23:30:00-0700","num_tweets":"61"},{"time":"2010-10-07 02:30:00-0700","num_tweets":"33"},{"time":"2010-10-07 05:00:00-0700","num_tweets":"15"},{"time":"2010-10-07 07:00:00-0700","num_tweets":"21"},{"time":"2010-10-07 09:00:00-0700","num_tweets":"21"},{"time":"2010-10-07 11:00:00-0700","num_tweets":"71"},{"time":"2010-10-07 13:00:00-0700","num_tweets":"73"},{"time":"2010-10-07 15:00:00-0700","num_tweets":"21"},{"time":"2010-10-07 16:30:00-0700","num_tweets":"17"},{"time":"2010-10-07 17:30:00-0700","num_tweets":"34"},{"time":"2010-10-07 19:00:00-0700","num_tweets":"16"},{"time":"2010-10-07 21:00:00-0700","num_tweets":"53"},{"time":"2010-10-07 23:30:00-0700","num_tweets":"15"},{"time":"2010-10-08 02:30:00-0700","num_tweets":"26"},{"time":"2010-10-08 05:00:00-0700","num_tweets":"0"},{"time":"2010-10-08 06:30:00-0700","num_tweets":"12"},{"time":"2010-10-08 08:00:00-0700","num_tweets":"27"},{"time":"2010-10-08 09:30:00-0700","num_tweets":"41"},{"time":"2010-10-08 11:00:00-0700","num_tweets":"17"},{"time":"2010-10-08 13:00:00-0700","num_tweets":"58"},{"time":"2010-10-08 15:00:00-0700","num_tweets":"81"},{"time":"2010-10-08 17:00:00-0700","num_tweets":"66"},{"time":"2010-10-08 19:00:00-0700","num_tweets":"48"},{"time":"2010-10-08 21:00:00-0700","num_tweets":"31"},{"time":"2010-10-08 23:30:00-0700","num_tweets":"16"},{"time":"2010-10-09 02:30:00-0700","num_tweets":"0"},{"time":"2010-10-09 05:30:00-0700","num_tweets":"0"},{"time":"2010-10-09 08:00:00-0700","num_tweets":"11"}]
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