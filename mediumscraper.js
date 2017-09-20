var Promise = require('promise');
var scraperjs = require('scraperjs');
var Scraper = {};

  Scraper.getAllLinks = function(url) {
    return Promise.resolve(
      scraperjs.StaticScraper
        .create(url)
        .scrape(Scraper.fetchAllLinks)
    )
  };


  Scraper.fetchAllLinks =  function($) {
    return $('a').map(function extractLink() {
      var link = $(this).attr('href');
      return { link };
    }).get();
  };




module.exports = Scraper;