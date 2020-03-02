// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var axios = require("axios");

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
}