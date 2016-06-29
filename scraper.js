var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {

    //Scraping URL
    url = 'https://origin-web-scraping.herokuapp.com/';
    request(url, function(error, response, html) {

        if (!error) {
            var $ = cheerio.load(html);

            //Holds the items in an array
            var jsonData = [];

            //Calls the panel element and grabs necessary items(elements) based on requirements given
            $('.panel').each(function() {

                var data = $(this);
                var name = data.children().first().text().trim();
                var imageUrl = data.children().eq(1).children().first().attr('src');
                var author = data.children().eq(1).children().eq(1).text();
                var price = data.children().eq(1).children().eq(2).text();

                //Defines the variable for each item grabbed and push those items into a json file
                var json = { name: name, imageUrl: imageUrl, author: author, price: price };
                jsonData.push(json);

            })

        }

        //Creates a JSON file based on items grabbed
        fs.writeFile('books.json', JSON.stringify(jsonData, null, 4), function(err) {
            console.log('Successfully made a JSON file');
        })

        //Sends a signal from the browser
        res.send('Verify console');
    })
})

//Sets the port number
app.listen('8080')
console.log('This will be awesome');
exports = module.exports = app;
