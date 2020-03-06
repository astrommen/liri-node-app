// Required Packages
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var moment = require("moment");

var axios = require("axios");

var fs = require("fs");
//End of Package List

// var to grab Spotify API ID & Key
var spotify = new Spotify(keys.spotify);

// initialize var to user query
var userInput = process.argv.slice(3).join(" ");

if (process.argv[2]==="concert-this"){

    concert(userInput);

} else if (process.argv[2]==="spotify-this-song"){

        song(userInput);

} else if(process.argv[2]==="movie-this"){

    movie(userInput);
    
} else if (process.argv[2]==="do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
        var output = data.split(",");
        console.log(output);
        process.argv[2] =  output[0]; console.log(process.argv[2]);
        process.argv[3] = output[1]; console.log(process.argv[3]);
    });
}

// Concert Function for modularity
function concert(userInput) {
    
    // Bands In Town API
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    .then(function(response) {
        
        // loop thru data call array & parse info to vars
        response.data.forEach(element => {
            
            var name = element.venue.name;
            var city = element.venue.city;
            var country = element.venue.country;
            var date = moment(element.datetime).format('MMMM Do YYYY, h:mm a');
            
            // Prints parsed data in readable format
            console.log(
                "\nName of the venue: " + name +
                "\nLocation: " + city + "," + country +
                "\nDate: " + date + "\n"
            );
        });
    });
}; // End of Concert Function

// Spotify Function for modularity
function song(userInput) {

    // checks no input to use default
    if(!userInput){

        // default value is The Sign
        userInput = "The Sign";
    }

    // Spotify API 
    spotify.search({type: "track", query: userInput},
    function(err, data){

        // logs any errors
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        // loop thru data call array & parse info to vars
        var element = data.tracks.items[0];

        // limits results to those with working preview urls
        if (element.preview_url != null){

            var artist = element.artists[0].name;
            var song = element.name;
            var album = element.album.name;
            var preview = element.preview_url;

            // Prints parsed data in readable format
            console.log(
                // "\n#"+ i + 
                "\nArtist: " + artist +
                "\nSong: " + song +
                "\nAlbum: " + album +
                "\nPreview Link: " + preview + "\n"
            );
        };
    });
}; // End of Spotify Function

// Movie Function for modularity
function movie(userInput) {

    // checks no input to use default
    if(!userInput){

        // default is Mr. Nobody
        userInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
    .then(function(response, err) {

        // logs any errors
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        // sets response to var for modularity
        var result = response.data;

        // prints out parsed data in easy format
        console.log(
            "Title: " + result.Title + 
            "\nYear: " + result.Year + 
            "\n" + result.Ratings[0].Source + 
            ": " + result.Ratings[0].Value +
            "\n" + result.Ratings[1].Source + 
            ": " + result.Ratings[1].Value +
            "\nCountry: " + result.Country + 
            "\nLanguage: " + result.Language + 
            "\nPlot: " + result.Plot + 
            "\nActors: " + result.Actors + "\n"
        );
    });
}; // End of Movie Function 