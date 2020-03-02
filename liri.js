// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var axios = require("axios");

if (process.argv[2]==="concert-this"){
    var artist = process.argv.slice(3).join(" ");
    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            response.data.forEach(element => {
                
                console.log(element.venue);
                console.log(element.datetime);
            });
        }
    )

}