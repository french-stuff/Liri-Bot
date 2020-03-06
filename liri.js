require("dotenv").congig();
const Spotify = require('node-spotify-api');
const axios = require("axios");
const fileSystem = require("fs");
const key = require("./keys.js");
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
  Rotten Tomatoes rating: ${getback.Ratings[1].Value}
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
  
  
  
  
  const findSong = (song = "The Sign ace of base") => {
  
  
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
  