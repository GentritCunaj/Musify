require("dotenv").config()
const { getLyrics, getSong } = require('genius-lyrics-api');
const request = require('request');
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { getJson } = require("serpapi");
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/artistPhotos",(req,res)=>{
  const artist = req.body.artist;
  getJson({
    engine: "google_images",
    api_key: "6fcf774a65e7279269630bb11973ae57d365bddbae1aa83b20e804694d8152a2", // Get your API_KEY from https://serpapi.com/manage-api-key
    q:artist,
    location: "Austin, Texas",
  }, (json) => {
    res.send(json);
  });
  
})

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    redirectUri: 'http://localhost:3000',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.send(err);

    })
})



app.post('/lyrics', (req, res) => {
  const {title,artist} = req.body;
  const options = {
    apiKey:'xJgVplTS4LbnsAlTgp278aSV1OHy9V0aENdMeriyXa-XBJSp6iMm95MFqJI9jjxv',
    title:title,
    artist:artist,
    optimizeQuery:true
  
  }
  getSong(options)
    .then((lyrics) => {
    
      res.json({ lyrics });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch lyrics' });
    });
  
})

app.listen(3001)