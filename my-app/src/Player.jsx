import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;

  return (
    <div style={{ 
        backgroundColor: "#333", 
        borderRadius: "15px", 
      
      }}>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        styles={{
          activeColor: '#fff',
          bgColor: 'transparent', // Ensure the player's background is transparent
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          sliderHandleColor: '#fff',
          sliderHandleBorderRadius: 50,
          sliderTrackBorderRadius: 50,
        }}
      />
    </div>
  );
}
