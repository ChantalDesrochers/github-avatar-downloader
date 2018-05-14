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
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    // console.log(body[0].avator_url)
    var data2 = data.map(function(el) {
       return el['avatar_url'];
    })
    cb(err, data2);
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}


downloadImageByURL('https://avatars1.githubusercontent.com/u/81942','./images')


// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });