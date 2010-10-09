
var augmentValueByEvent = function(company, activityObject) {
  if(activityObject.what == 'twitter_mentions') {
    var changeFromAverage = (((100*activityObject.raw_value)/company.mentions_average)/100);
    var weight = 2;
    var value = activityObject.value;
    if(changeFromAverage>1) {
      value = value + (weight * changeFromAverage);
    } else {
      value = value - (weight * (1+changeFromAverage));
    }
    activityObject.value = value;
    //sys.puts(activityObject.value);
  }
};

var synthesize = function(company) {
  company.activity = [];
  company.mentions_average = 0;
  for(var i=0; company.twitter_mentions.length>i; i++) {
    var activityObject = {};
    activityObject.when = Date.parse(company.twitter_mentions[i].time);
    activityObject.timestamp = activityObject.when-0;
    activityObject.what = 'twitter_mentions';
    activityObject.raw_value = parseInt(company.twitter_mentions[i].num_tweets);
    company.activity.push(activityObject);
    company.mentions_average += activityObject.raw_value;
  }
  company.mentions_average = company.mentions_average/company.twitter_mentions.length;
  
  company.activity.sort(function(a, b) {
    return (a.when - b.when);
  });
  
  var previousValue = company.start_value;
  for(var i=0; company.activity.length>i; i++) {
    company.activity[i].value = previousValue;
    augmentValueByEvent(company, company.activity[i]);
    previousValue = company.activity[i].value;
  }
  
  return company;
}


exports.synthesize = synthesize;