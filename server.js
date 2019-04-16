// Parses our HTML and helps us find elements. code skeleton via 18.2-05-scraping assignment
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// console.logging what the server.js is doing and a message to show that its connected
console.log("\n***********************************\n" +
            "Testing an cheerio and axios console.log\n" +
            "\n***********************************\n");

// axios get method created to .get the link of choice. complex-sneakers page
axios.get("https://www.complex.com/sneakers/").then(function(response) {
    // using cheerio to load the data onto the console.log, $ acts as the cheerio selector
    var $ = cheerio.load(response.data);
    // then storing the data into an empty array from the axios scraping
    var results = [];
    // $ cheerio scraping into the link from axios "having to find the title/header to grab from" 
    // in this case h2.feed-article_title is where the sneaker articles from complex is in html
    $("h2.feed-article__title").each(function(i, element) {
        var title = $(element).text();
        // the link variable grabs the child element within the selected element and saves the "href" attribute from the element
        var link = $(element).parent().attr("href");
        //  save and push the results 
        results.push({
          title: title,
          link: link
        });
    });
     console.log(results);
});
