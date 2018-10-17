const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


app.get('/api/stats', (req, res) => {

    const url = 'https://www.pro-football-reference.com/teams/dal/2018.htm#all_games';


    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            // games played
            var results = $("td[data-stat='game_outcome']").text();
            var allResults = results.split("");
            var lastResult = allResults[allResults.length -1]
            var didWin = lastResult === 'W' ? 'Yes' : 'No'


            var json = {
                results: results,
                lastGame: lastResult,
                didWin: didWin
            }

            res.send(json);

        } else {
            console.log(error);
        }
    })

});


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Listening on port ${port}`));