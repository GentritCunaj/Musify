import React from 'react';
import PixiMusicGame from './MiniGameComponent.jsx';

const MiniGamePage = () => {
  return (
    <div style={{ textAlign: 'center', color: 'white', paddingTop: '50px' }}>
      <h1>Welcome to the Music Mini-Game</h1>
      <p>Click or draw on the canvas to play music notes!</p>
      <p>Login with Spotify to access more features.</p>
      <PixiMusicGame /> {/* Render the Pixi music game */}
    </div>
  );
};

export default MiniGamePage;
