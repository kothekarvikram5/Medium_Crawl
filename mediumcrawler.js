var Promise = require('promise');
var _array = require('lodash/array');
var mediumScraper = require('./mediumscraper');
var Crawler = {};

    Crawler.foundUrls = [];
    Crawler.crawledUrls = {};
    Crawler.crawledSize = 0;
    Crawler.chunkCur = 0;
    Crawler.maxPages = 5;
    Crawler.request = 5;

Crawler.crawl = function(url){

    if (this.crawledUrls[url] || this.crawledSize >= this.maxPages) {
      return Promise.resolve([]);
    }
    
    return mediumScraper.getAllLinks(url)
      .then(urlObjects => 
      this.foundUrls = this.foundUrls.concat(urlObjects),
      this.crawledUrls[url] = true,
      this.crawledSize++
    )
      .then(() => this.ChunkWise())
      .then(() => ({ foundUrls: this.foundUrls, crawledUrls: this.crawledUrls }));
};


Crawler.ChunkWise = function(){
      var chunks = _array.chunk(this.foundUrls, this.request);
    if (this.chunkCur >= chunks.length) return Promise.resolve();
    return Promise.all(chunks[this.chunkCur++], item => this.crawl(item.link))
      .then(() => this.ChunkWise());
};
module.exports = Crawler;
