# liri-node-app

## Language Interpretation and Recognition Interface

### Overview

1. LIRI takes the following commands:
   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

2. What each command shows:
    * `concert-this`
        * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

            * Name of the venue

            * Venue location

            * Date of the Event (use moment to format this as "MM/DD/YYYY")
    
    * `spotify-this-song`
        * This will show the following information about the song in the terminal:

            * Artist(s)

            * The song's name

            * A preview link of the song from Spotify

            * The album that the song is from

        * If no song is provided then your program will default to "The Sign" by Ace of Base.
    
    * `movie-this`
        * This will output the following information to your terminal/bash window:

            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie.

        * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    * `do-what-it-says`
        * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

            * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

            * Edit the text in random.txt to test out the feature for movie-this and concert-this.

    * outputs the data to a .txt file called `log.txt`.
        * It appends each command the user runs to the `log.txt` file. 

        * Does not overwrite the log each time the user runs a command.
