import {React,useEffect,useState} from 'react'
import axios from 'axios'
import useAuth from './useAuth';
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

export default function Dashboard({accessToken}) {
 
  

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [spotifyApi, setSpotifyApi] = useState(new SpotifyWebApi({
    clientId: "0279f1ff50264cd6a94b5b3de26c30af",
    clientSecret: "8c810e9d78d24b5795ee250f214c75d0"
  }));


  function chooseTrack(track) {
    setPlayingTrack(track);
    console.log(track,"tracki bo")
    setSearch("");
    axios.post("http://localhost:3001/lyrics", {
        
             artist: track.artist,
             title:track.title
             
    })
    .then(res => {
        setLyrics(res.data.lyrics.lyrics);
        console.log(res.data.lyrics.lyrics);

    })
    .catch(err => console.log(err))
    
}
 
  useEffect(() => {
    
    if (!accessToken) return
    
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
  
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  if (!accessToken) return null;

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )
}
