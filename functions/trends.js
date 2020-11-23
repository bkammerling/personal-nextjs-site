const googleTrends = require('google-trends-api');

exports.handler = function(event, context, callback) {
  googleTrends.dailyTrends({
    geo: 'GB',
  }, function(err, results) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            'content-type': 'application/json',
          },
          body: results
        })
      } 
  });
}
