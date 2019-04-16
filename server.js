
// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Parses our HTML and helps us find elements. code skeleton via 18.2-05-scraping assignment
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// mongojs to db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route to display Hello World to show that we're in the db
app.get("/", function(req, res) {
    res.send("Hello world we're entering the scene of sneakers");
  });

// all app.get method from via 18.2-11-scraping assignment
app.get("/all", function(req, res) {
    db.scrapedData.find({}, function(error, found) {
        // Throw any errors to the console
        if (error) {
        console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
        res.json(found);
        }
    });
});

// console.logging what the server.js is doing and a message to show that its connected
console.log("\n***********************************\n" +
            "Grabbing some FIRE JAWN SNEAKER INFO FROM COMPLEX MAGAZINE\n" +
            "\n***********************************\n");

// handlebars /scrape for the axios get method w
app.get("/scrape", function(req, res) {
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
            // the link variable grabs the parent element within the selected element and saves the "href" attribute from the element
            var link = $(element).parent().attr("href");
            //  save and push the results 
            results.push({
            title: title,
            link: link
            });
        });
        console.log(results);
    });
    res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});
  