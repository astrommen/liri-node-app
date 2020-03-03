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
    if(process.argv[3]!=null){
        var song = process.argv.slice(3).join(" ");
        var i = 0;
        console.log(song);
        spotify.search({type: "track", query: song},
        function(err, data){
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            data.tracks.items.forEach(element => {
                if (element.preview_url != null && i<1){
                    i++
                    console.log(element);
                    console.log(
                        "#"+ i + "\nArtist: " + element.artists[0].name +
                        "\nSong: " + element.name +
                        "\nAlbum: " + element.album.name +
                        "\nPreview Link: " + element.preview_url
                    );
                    
                };
            });
        });
    } else{
        console.log("no input");
        spotify.search({type: "track", query: "The Sign"},
        function(err,data){
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            var defaulted = data.tracks.items[0];
            console.log("\nArtist: " + defaulted.artists[0].name +
            "\nSong: " + defaulted.name +
            "\nAlbum: " + defaulted.album.name +
            "\nPreview Link: " + defaulted.preview_url + "\n");
        });
    };
} else if(process.argv[2]==="movie-this"){
    var movie = process.argv.slice(3).join(" ");
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        var result = response.data;
        console.log(
            "Title: " + result.Title + 
            "\nYear: " + result.Year + 
            "\n" + result.Ratings[0].Source +": "+ result.Ratings[0].Value +
            "\n" + result.Ratings[1].Source +": "+ result.Ratings[1].Value +
            "\nCountry: " + result.Country + 
            "\nLanguage: " + result.Language + 
            "\nPlot: " + result.Plot + 
            "\nActors: " + result.Title + "\n");
    })
}