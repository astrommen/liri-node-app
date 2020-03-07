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
var divider = "------------------------------------------------------------\n\n";

if (process.argv[2]==="do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
        var output = data.split(",");
        console.log(output);
        process.argv[2] =  output[0]; 
        userInput = output[1]; 
        
        liriBot();
    });
} else {
    liriBot();
}

// Liri Bot Function for modularity
function liriBot(){
    if (process.argv[2]==="concert-this"){

        // runs concert function
        concert(userInput); 
    
    } else if (process.argv[2]==="spotify-this-song"){
    
        // runs song function
        song(userInput);
    
    } else if(process.argv[2]==="movie-this"){
    
        // runs movie function
        movie(userInput);
        
    };
}// End of LiriBot

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
            var concertData = [
                userInput,
                "Venue: " + name,
                "City: " + city,
                "Country" + country,
                "Date: " + date,
                divider
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", concertData, 
            function(err) {
                if (err) throw err;
                console.log(concertData);
            });
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
            var songData = [
                "\nArtist: " + artist,
                "\nSong: " + song,
                "\nAlbum: " + album,
                "\nPreview Link: " + preview,
                divider
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", songData, 
            function(err) {
                if (err) throw err;
                console.log(songData);
            });
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

    // OMDB Movie API
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
    .then(function(response, error) {

        // logs any errors
        if (error) {
            return console.log('Error occurred: ' + error);
        };

        // sets response to var for modularity
        var result = response.data;

        // prints out parsed data in easy format
        var movieData = [
            "\nTitle: " + result.Title,
            "Year: " + result.Year, 
            result.Ratings[0].Source + 
            ": " + result.Ratings[0].Value, 
            result.Ratings[1].Source + 
            ": " + result.Ratings[1].Value,
            "Country: " + result.Country,  
            "Language: " + result.Language,
            "Plot: " + result.Plot,
            "Actors: " + result.Actors,
            divider
        ].join("\n\n")

        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", movieData, 
        function(err) {
            if (err) throw err;
            console.log(movieData);
        });
    });
}; // End of Movie Function 