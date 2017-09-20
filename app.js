var fs = require('fs');
var array = require('lodash/array');
var MediumCrawler = require('./mediumcrawler');

MediumCrawler.crawl('https://medium.com')
.then((result) => {
    var newResult = { crawledUrls: result.crawledUrls };
    newResult.foundUrls = array.uniqBy(result.foundUrls, 'link');
    return newResult;
  })
  .then((result) => {
    var stream = fs.createWriteStream('result.csv');
    stream.once('open', () => {
      result.foundUrls.forEach(row => stream.write(`${row.link}\n`));
      stream.end();
  })
  });
