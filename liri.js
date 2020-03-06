require("dotenv").config();


const Spotify = require('node-spotify-api');
const axios = require("axios");
const fileSystem = require("fs");
const keys = require("./keys.js");
const moment = require('moment');



const doWhat = () => {


    fileSystem.readFile("random.txt", (err, data) => {
  
  
  
  
      let command = data.toString().split(",")[0];
      let query = data.toString().split(",")[1];
      const { exec } = require('child_process');
  
  
      exec(`node liri ${command} ${query}`, (err, stdout, stderr) => {
  
  
        if (err) {
  
          console.log(`stderr: ${stderr}`);
          throw err;
  
        }
  
  
        console.log(`stdout: ${stdout}`);
  
  
  
  
      });
  
  
  
  
    });
  
  
  }
  
  
  
  
  const divider = `
  =====================================================================================
  `;
  
  
  
  const findMovie = (movie = "Mr Nobody") => {
  
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
  
  
        let getback = response.data;
  
        console.log(`
  ${divider}
  Name: ${getback.Title}
  Year: ${getback.Year}
  IMDB rating: ${getback.imdbRating}
  Country of origin: ${getback.Country}
  Language: ${getback.Language}
  Plot: ${getback.Plot}
  Starring: ${getback.Actors}
  ${divider}`);
  
      }
    );
  
  }
  
  const command = process.argv[2];
  const query = process.argv[3] ? process.argv.slice(3).join(" ") : undefined;
  
  
  
  
  const findSong = (song = "The Sign") => {
  
  
    let spotify = new Spotify(keys.spotify);
  
  
    spotify.search({
      type: "track",
      query: song,
      limit: 1
    })
      .then(function (response) {
        let result = response.tracks.items;
        for (let i = 0; i < result.length; i++) {
          resultData =
  
            `
   ${divider}
   Artists: ${result[i].artists[i].name} 
   Track:   ${result[i].name} 
   Preview: ${result[i].preview_url} 
   Album:   ${result[i].album.name}
   ${divider}
   `
          console.log(resultData);
  
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  
  
      
  
  
  
  
  
  }
  
  
  const findConcert = (concert) => {
  
    let bandsintown = `https://rest.bandsintown.com/artists/${concert}/events?app_id=codingbootcamp`;
    console.log(bandsintown);
  
    axios.get(bandsintown).then(
      function (response) {
  
        const getback = response.data[0];
  
        console.log(`
  ${divider}
  ${query} will perform at 
  ${getback.venue.name} in ${getback.venue.city}, ${getback.venue.region}
  on ${moment(getback.datetime).format('MM/DD/YYYY')}
  ${divider}
  `);
  
  
  
  
  
      }
    ).catch(function (err) {
      if (err) {
        console.log(`
  *************************************************************
  ${query} has no upcoming events currently, try another search
  *************************************************************`);
      }
    }
    )
  };
  
  if (process.argv[2]){
  
    fileSystem.appendFile("log.txt", `${divider} ${process.argv[2]} ${query} \n\n`, err => {
    
    
    if (err) throw err;
    
    })
    }
  
    if (command === "concert-this") {


        findConcert(query);
      
      
      
      
      
      }
      else if (command === "spotify-this-song") {
      
        findSong(query);
      
      }
      
      else if (command === "movie-this") {
        findMovie(query);
      
      }
      
      else if (command === "do-what-it-says") {
      
      
      
        doWhat();
      
      
      
      
      }
      
      
      else {
        console.log(`
      ******************************************************
      Error: The only valid LIRI commands are the following:
      concert-this [music artist]
      spotify-this-song [song name]
      movie-this [movie name]
      do-what-it-says - must have command and query separated by a ',' in random.txt
      ******************************************************
      `)
      }