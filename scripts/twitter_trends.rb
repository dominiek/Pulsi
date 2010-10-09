#/usr/bin/ruby

require "cgi"
require "base64"
require "openssl"
require "digest/sha1"
require "uri"
require "net/https"
require "rubygems"
require 'hpricot'
require "time"
require "json"

keyword = ARGV[0]

if !keyword
  puts "Usage: twitter_trends <keyword>"
  exit
end

data = Net::HTTP.get(URI.parse("http://trendistic.com/_embed-670/#{keyword}?tz=2"))

csv = nil
data.each_line do |line|
  if(line =~ /var plot\ =/)
    csv = line.strip
    csv = csv.gsub(/';$/, '')
    csv = csv.gsub(/.+\=\ \'/, '').split("\\n")
    break
  end
end

results = []
csv.each do |line|
  line = line.split(',')
  time = line[0]
  num_tweets = line.last
  results << {:time => time, :num_tweets => num_tweets}
end

puts results.to_json
