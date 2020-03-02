require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var moment = require("moment");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

if (process.argv[2]==="concert-this"){
    var artist = process.argv.slice(3).join(" ");
    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            response.data.forEach(element => {
                
                var name = element.venue.name;
                var city = element.venue.city;
                var country = element.venue.country;
                var date = moment(element.datetime).format('MMMM Do YYYY, h:mm a');
                console.log(
                    "Name of the venue: " + name +
                    "\nLocation: " + city + "," + country +
                    "\nDate: " + date + "\n");
            });
        }
    );
} else if (process.argv[2]==="spotify-this-song"){
    var song = process.argv.slice(3).join(" ");
    console.log(song);
    spotify.search({type: "track", query: song},
    function(err, data){
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        var i = 0;
        data.tracks.items.forEach(element => {
            if (element.preview_url != null){// && i < 1){
                i++;
                console.log(i);
                console.log("Artist: " + element.artists[0].name);
                console.log("Song: " + element.name);
                console.log("Album: " + element.album.name);
                console.log("Preview Link: " + element.preview_url);
            }
        })
    });
}