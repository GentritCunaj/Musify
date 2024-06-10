import React, { useState } from 'react';
import PixiMusicComponent from './PixiMusicComponent.jsx';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=0279f1ff50264cd6a94b5b3de26c30af&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  const [showPixiComponent, setShowPixiComponent] = useState(true);

  const handlePixiComponentMount = () => {
    setShowPixiComponent(false); // Set to false when Pixi component is mounted
  };

  // Apply overflow hidden to the body element
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
    };
  }, []);

  return (
    <>
      <PixiMusicComponent onMount={handlePixiComponentMount} shouldRender={showPixiComponent} />
      
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1, // Ensure it's on top of the Pixi component
        }}
      >
        <a className="btn btn-success btn-lg" style={{ background: 'black', width: "300px" }} href={AUTH_URL}>
          Login With Spotify
        </a>
      </div>
    </>
  );
}
