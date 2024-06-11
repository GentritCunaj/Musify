import React,{ useState }  from 'react';
import PixiMusicGame from './MiniGameComponent.jsx';
import PixiMusicComponent from './PixiMusicComponent.jsx';
import Navbar from './NavBar.jsx';

const MiniGamePage = () => {
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
    <Navbar/>
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to the Music Mini-Game</h1>
        <p style={styles.subtitle}>Click or draw on the canvas to play music notes!</p>
        <p style={styles.subtitle}>Login with Spotify to access more features.</p>
      </div>
        
      <div style={styles.gameContainer}>
        <PixiMusicGame onMount={handlePixiComponentMount} shouldRender={showPixiComponent}/>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    color: '#ffffff',
  },
  
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  gameContainer: {
    width: 'auto',
    maxWidth: 'auto',
    height: 'auto',
    backgroundColor: '#BFD0D3',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },
};

export default MiniGamePage;
