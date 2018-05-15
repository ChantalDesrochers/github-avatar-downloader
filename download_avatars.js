var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

// function getRepoContributors(repoOwner, repoName, cb) {
//   var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
//   request(url, function(err, res, body) {
//     cb(err, body);
//   });
// }

function getRepoContributors(repoOwner, repoName, cb) {
  if(process.argv.length !== 4) {
  console.log("must specify repo owner and repo name")
  return;
};
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var result = JSON.parse(body);
    cb(err, result);
  });

};



function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
console.log("Error", err);
    result.forEach(function(el) {
      downloadImageByURL(el['avatar_url'], './avatars/' + el['login'])
      // console.log(el['avatar_url']);
    });

    // console.log("Result:", result);
  })
