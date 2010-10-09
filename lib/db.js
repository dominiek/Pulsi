
fs = require('fs');

DB = {
  'companies': {},
  'users': {}
};

DB_FILE = __dirname + '/../data/development.db';

exports.fetchCompany = function(identifier, callback) {
  var company = {
    identfier: 'facebook',
    name: 'Facebook',
    description: "Big SNS",
    current_value: 2323,
    start_value: 2323,
    traffic: [{"page_views":120.0,"day":"2010-09-07","reach":5920},{"page_views":121.0,"day":"2010-09-08","reach":5520},{"page_views":108.0,"day":"2010-09-09","reach":5540},{"page_views":92.0,"day":"2010-09-10","reach":4890},{"page_views":72.0,"day":"2010-09-11","reach":3600},{"page_views":56.0,"day":"2010-09-12","reach":3130},{"page_views":102.0,"day":"2010-09-13","reach":5170},{"page_views":107.0,"day":"2010-09-14","reach":5490},{"page_views":131.0,"day":"2010-09-15","reach":6400},{"page_views":102.0,"day":"2010-09-16","reach":5140},{"page_views":94.0,"day":"2010-09-17","reach":4960},{"page_views":72.0,"day":"2010-09-18","reach":3590},{"page_views":100.0,"day":"2010-09-19","reach":5699},{"page_views":115.0,"day":"2010-09-20","reach":6010},{"page_views":128.0,"day":"2010-09-21","reach":6600},{"page_views":151.0,"day":"2010-09-22","reach":7700},{"page_views":140.0,"day":"2010-09-23","reach":7430},{"page_views":144.0,"day":"2010-09-24","reach":6560},{"page_views":74.0,"day":"2010-09-25","reach":3439},{"page_views":77.0,"day":"2010-09-26","reach":3670},{"page_views":123.0,"day":"2010-09-27","reach":5699},{"page_views":181.0,"day":"2010-09-28","reach":8300},{"page_views":174.0,"day":"2010-09-29","reach":8100},{"page_views":138.0,"day":"2010-09-30","reach":6150},{"page_views":120.0,"day":"2010-10-01","reach":6120},{"page_views":77.0,"day":"2010-10-02","reach":3660},{"page_views":88.0,"day":"2010-10-03","reach":4330},{"page_views":121.0,"day":"2010-10-04","reach":6150},{"page_views":117.0,"day":"2010-10-05","reach":5830},{"page_views":160.0,"day":"2010-10-06","reach":7800},{"page_views":122.0,"day":"2010-10-07","reach":6100}],
    twitter_mentions: [{"time":"2010-10-02 10:00:00","num_tweets":"8"},{"time":"2010-10-02 12:00:00","num_tweets":"20"},{"time":"2010-10-02 14:00:00","num_tweets":"9"},{"time":"2010-10-02 16:30:00","num_tweets":"30"},{"time":"2010-10-02 19:00:00","num_tweets":"9"},{"time":"2010-10-02 21:00:00","num_tweets":"11"},{"time":"2010-10-02 23:30:00","num_tweets":"86"},{"time":"2010-10-03 02:30:00","num_tweets":"22"},{"time":"2010-10-03 05:00:00","num_tweets":"10"},{"time":"2010-10-03 07:00:00","num_tweets":"13"},{"time":"2010-10-03 09:00:00","num_tweets":"37"},{"time":"2010-10-03 11:00:00","num_tweets":"48"},{"time":"2010-10-03 13:00:00","num_tweets":"38"},{"time":"2010-10-03 15:00:00","num_tweets":"25"},{"time":"2010-10-03 17:00:00","num_tweets":"8"},{"time":"2010-10-03 19:00:00","num_tweets":"0"},{"time":"2010-10-03 21:00:00","num_tweets":"28"},{"time":"2010-10-03 23:30:00","num_tweets":"101"},{"time":"2010-10-04 03:00:00","num_tweets":"28"},{"time":"2010-10-04 06:00:00","num_tweets":"8"},{"time":"2010-10-04 07:30:00","num_tweets":"19"},{"time":"2010-10-04 09:00:00","num_tweets":"57"},{"time":"2010-10-04 11:00:00","num_tweets":"99"},{"time":"2010-10-04 13:00:00","num_tweets":"89"},{"time":"2010-10-04 15:00:00","num_tweets":"42"},{"time":"2010-10-04 17:00:00","num_tweets":"40"},{"time":"2010-10-04 19:00:00","num_tweets":"27"},{"time":"2010-10-04 21:30:00","num_tweets":"15"},{"time":"2010-10-05 00:30:00","num_tweets":"39"},{"time":"2010-10-05 03:30:00","num_tweets":"58"},{"time":"2010-10-05 06:00:00","num_tweets":"42"},{"time":"2010-10-05 08:00:00","num_tweets":"110"},{"time":"2010-10-05 09:30:00","num_tweets":"49"},{"time":"2010-10-05 11:00:00","num_tweets":"71"},{"time":"2010-10-05 13:00:00","num_tweets":"35"},{"time":"2010-10-05 15:00:00","num_tweets":"59"},{"time":"2010-10-05 17:00:00","num_tweets":"56"},{"time":"2010-10-05 19:00:00","num_tweets":"32"},{"time":"2010-10-05 21:00:00","num_tweets":"79"},{"time":"2010-10-05 23:00:00","num_tweets":"49"},{"time":"2010-10-06 01:30:00","num_tweets":"30"},{"time":"2010-10-06 04:30:00","num_tweets":"93"},{"time":"2010-10-06 07:00:00","num_tweets":"51"},{"time":"2010-10-06 08:30:00","num_tweets":"83"},{"time":"2010-10-06 09:30:00","num_tweets":"61"},{"time":"2010-10-06 11:00:00","num_tweets":"117"},{"time":"2010-10-06 13:00:00","num_tweets":"36"},{"time":"2010-10-06 15:00:00","num_tweets":"9"},{"time":"2010-10-06 17:00:00","num_tweets":"107"},{"time":"2010-10-06 19:00:00","num_tweets":"28"},{"time":"2010-10-06 21:00:00","num_tweets":"104"},{"time":"2010-10-06 23:30:00","num_tweets":"61"},{"time":"2010-10-07 02:30:00","num_tweets":"33"},{"time":"2010-10-07 05:00:00","num_tweets":"15"},{"time":"2010-10-07 07:00:00","num_tweets":"21"},{"time":"2010-10-07 09:00:00","num_tweets":"21"},{"time":"2010-10-07 11:00:00","num_tweets":"71"},{"time":"2010-10-07 13:00:00","num_tweets":"73"},{"time":"2010-10-07 15:00:00","num_tweets":"21"},{"time":"2010-10-07 16:30:00","num_tweets":"17"},{"time":"2010-10-07 17:30:00","num_tweets":"34"},{"time":"2010-10-07 19:00:00","num_tweets":"16"},{"time":"2010-10-07 21:00:00","num_tweets":"53"},{"time":"2010-10-07 23:30:00","num_tweets":"15"},{"time":"2010-10-08 02:30:00","num_tweets":"26"},{"time":"2010-10-08 05:00:00","num_tweets":"0"},{"time":"2010-10-08 06:30:00","num_tweets":"12"},{"time":"2010-10-08 08:00:00","num_tweets":"27"},{"time":"2010-10-08 09:30:00","num_tweets":"41"},{"time":"2010-10-08 11:00:00","num_tweets":"17"},{"time":"2010-10-08 13:00:00","num_tweets":"58"},{"time":"2010-10-08 15:00:00","num_tweets":"81"},{"time":"2010-10-08 17:00:00","num_tweets":"66"},{"time":"2010-10-08 19:00:00","num_tweets":"48"},{"time":"2010-10-08 21:00:00","num_tweets":"31"},{"time":"2010-10-08 23:30:00","num_tweets":"16"},{"time":"2010-10-09 02:30:00","num_tweets":"0"},{"time":"2010-10-09 05:30:00","num_tweets":"0"},{"time":"2010-10-09 08:00:00","num_tweets":"19"}]
  };
  callback(company);
};


exports.load = function(callback) {
  fs.readFile(DB_FILE, function (err, data) {
    if(err) {
      return;
    }
    DB = JSON.parse(data);
    callback(DB);
  }); 
};

exports.store = function() {
  fs.write
  fs.writeFile(DB_FILE, JSON.stringify(DB), function (err) {
    if(err) {
      throw err;
    }
    callback(DB);
  });
};


