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

ACCESS_KEY_ID = "0FRMRX528RMRYGY85P82"
SECRET_ACCESS_KEY = "CB+LLiOyCIQSTzpmW8iOgT5kzEbCvIBbN4nECqKK"

action = "TrafficHistory"
responseGroup = "History"
url = ARGV[0]

if !url
  puts "Usage: alexa_history <domain>"
  exit
end

timestamp = ( Time::now ).utc.strftime("%Y-%m-%dT%H:%M:%S.000Z")

signature = Base64.encode64( OpenSSL::HMAC.digest( OpenSSL::Digest::Digest.new( "sha1" ), SECRET_ACCESS_KEY, action + timestamp)).strip

url = URI.parse(

          "http://awis.amazonaws.com/?" +
          {
            "Action"       => action,
            "AWSAccessKeyId"  => ACCESS_KEY_ID,
            "Signature"       => signature,
            "Timestamp"       => timestamp,
            "ResponseGroup"   => responseGroup,
            "Url"           => url
          }.to_a.collect{|item| item.first + "=" + CGI::escape(item.last) }.join("&")     # Put key value pairs into http GET format
       )

#xml  = REXML::Document.new( Net::HTTP.get(url) )
doc = Hpricot( Net::HTTP.get(url) )

results = []
elements = doc.search("aws:data")
elements.each do |element|
  day = element.at('aws:date').inner_text
  page_views_per_million = element.at('aws:pageviews//aws:permillion').inner_text.strip
  reach_per_million = element.at('aws:reach').inner_text.strip
  results << {:day => day, :page_views => page_views_per_million.to_f, :reach => reach_per_million.to_i}
end
puts results.to_json
