import React, { useState } from 'react';
import PixiMusicComponent from './PixiMusicComponent.jsx';
import Navbar from './NavBar.jsx';

const AboutUsPage = () => {
  const [showPixiComponent, setShowPixiComponent] = useState(true);

  const handlePixiComponentMount = () => {
    setShowPixiComponent(false); // Set to false when Pixi component is mounted
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
    };
  }, []);

  return (
    <>
      
      <PixiMusicComponent onMount={handlePixiComponentMount} shouldRender={showPixiComponent} />
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>About Us</h1>
        <div style={styles.container2}>
          <div style={styles.textArea}>
            <p style={styles.text}>
              We are a group of students passionate about music who created this project. Our goal is to make it easy for
              users to play music, read lyrics, and discover information about the artists.
            </p>
            <p style={styles.text}>
              We believe that listening to music should be an enjoyable and immersive experience. Our platform aims to make
              music discovery and enjoyment more accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    color: '#ffffff',
    padding: '0 20px', // Equal spacing on the sides
  },
  container2: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',

    color: '#ffffff',
    padding: '0 20px', // Equal spacing on the sides
  },
  textArea: {
    maxWidth: '800px', // Max width for the text area
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem', // Increased font size
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.6rem', // Increased font size
    marginBottom: '15px',
  },
};

export default AboutUsPage;
