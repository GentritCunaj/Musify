import {React,useEffect,useState,useRef} from 'react'
import axios from 'axios'
import useAuth from './useAuth';
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Canvas } from 'react-three-fiber';
import PixiMusicComponent from './PixiMusicComponent.jsx';

import { useLoader,useFrame } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Navbar from './NavBar.jsx';


const ModelWithTextures = ({ modelPath, numTextures,objRef }) => {
 
  const [texture1, setTexture1] = useState();
  const [rotationSpeed, setRotationSpeed] = useState(0.002); 

  // Load OBJ model using useLoader
  const objModel = useLoader(OBJLoader, modelPath);
  useEffect(() => {
    // Load the first texture only (index 0)
    const textureLoader = new TextureLoader();
    const firstTexturePath = '/objs/texture/Vinyl_disc_Baked.png'; // Adjust the path for the first texture

    // Load the texture
    const loadedTexture = textureLoader.load(firstTexturePath);

    // Store the loaded texture in state
    setTexture1(loadedTexture);
  }, [modelPath]);
  useEffect(() => {
    // Apply the texture to the model once loaded
    if (texture1) {
      objModel.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture1;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture1, objModel]);



  return (
    <primitive
     ref={objRef}
      object={objModel}
      position={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[0, 0, 0]}
    />
  );
};

export default function Dashboard({accessToken}) {
  const [showPixiComponent, setShowPixiComponent] = useState(true);

  const handlePixiComponentMount = () => {
    setShowPixiComponent(false); // Set to false when Pixi component is mounted
  };
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const objRef = useRef();
  const [search, setSearch] = useState("")
  const [images,setImages] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [spotifyApi, setSpotifyApi] = useState(new SpotifyWebApi({
    clientId: "a76ea47fed02462c81306ccebe692c19",
    clientSecret: "c2e902ab31024e91a061d4436933f67e"
  }));
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slideContent = [
    
    {
      backgroundColor: "rgb(254,160,0)",
      title: playingTrack && playingTrack.artist,
    },
    {
      backgroundColor: "rgb(231, 58, 95)",
      title: playingTrack && playingTrack.artist,
    
    },
    {
      backgroundColor: "rgb(176, 136, 240)",
      title: playingTrack && playingTrack.artist,
     
    },
    {
      backgroundColor: "#fde",
      title: playingTrack && playingTrack.artist,
     
    },
    {
      backgroundColor: "rgb(34,61,97)",
      title: playingTrack && playingTrack.artist,
     
    },
    {
      backgroundColor: "rgb(255,225,189)",
      title: playingTrack && playingTrack.artist,
     
    },
   
  ];


    const changeSlide = (direction) => {
      const sliderContainer = document.querySelector('.slider-container');
      const slideRight = document.querySelector('.right-slide');
      const slideLeft = document.querySelector('.left-slide');
      const upButton = document.querySelector('.up-button');
      const downButton = document.querySelector('.down-button');

    
        if (!sliderContainer || !slideRight || !slideLeft || !upButton || !downButton) {
        return;
      }

      const slidesLength = slideRight.querySelectorAll('div').length;
      const sliderHeight = sliderContainer.clientHeight;

      if (direction === 'up') {
        setActiveSlideIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % slidesLength;
          console.log('New activeSlideIndex (up):', newIndex);
          return newIndex;
        });
      } else if (direction === 'down') {
        setActiveSlideIndex((prevIndex) => {
          const newIndex = (prevIndex - 1 + slidesLength) % slidesLength;
          console.log('New activeSlideIndex (down):', newIndex);
          return newIndex;
        });
      }

      if (slideRight && slideLeft) {
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
       
      }
    };

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
        

    })
    .catch(err => console.log(err))

    axios.post("http://localhost:3001/artistPhotos",{
      artist:track.artist
    }).then((res)=>{

      const spliced_result = res.data.images_results.slice(0,6);
      console.log(spliced_result)
      spliced_result.forEach((f) => {
        setImages((prevImages) => [...prevImages, f.original]);
      });
    })
     
      
    
    
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

  const modelPath = '/objs/Vinyl_disc.obj'; // Path to your OBJ model file
  const rotationSpeed = 0.01;
 
  return (
    <>
    <Navbar/>
    <div style={{ 
  position: 'absolute', 
  top: 40, 
  left: 0,
  width: '100vw', 
  height: '100vh', 
  overflow: 'hidden', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center' 
}}>
  
  <PixiMusicComponent onMount={handlePixiComponentMount} shouldRender={showPixiComponent} />
  
  <Container className="d-flex flex-column py-2" style={{ height: '95vh', width: '80%', marginTop: '-40px'}}>
      
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
            
                  {playingTrack && (
         <div className="slider-container">
         <div className="left-slide" >
           <div style={{ backgroundColor: slideContent[activeSlideIndex].backgroundColor }}>
           <Canvas
      style={{ width: '40vh', height: '80vh' }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      onCreated={({ gl, camera }) => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        // Animation loop using requestAnimationFrame
        const animate = () => {
          // Ensure objRef.current is defined before accessing its properties
          if (objRef.current) {
           
            objRef.current.rotation.y += rotationSpeed; // Rotate around y-axis
          }
          controls.update(); // Update controls
          requestAnimationFrame(animate); // Request next frame
        };

        animate(); // Start animation loop
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ModelWithTextures modelPath={modelPath} objRef={objRef}/>
    </Canvas>
             <h1 style={{position:'relative',top:"-150px"}}>{slideContent[activeSlideIndex].title}</h1>
            
           </div>
         </div>
         <div class="right-slide">
         {images && images.map((imageUrl, index) => (
  <div key={index} style={{ backgroundImage: `url(${imageUrl})`, height: '100%', width: '100%',backgroundSize:'cover' }}>
    {/* You can add additional content or styling here */}
  </div>
))}
         </div>
         <div class="action-buttons">
           <button class="down-button" onClick={() => changeSlide('down')}>
           <FontAwesomeIcon icon={faArrowDown} />
           </button>
           <button class="up-button">
           <FontAwesomeIcon icon={faArrowUp} onClick={() => changeSlide('up')}/>
           </button>
         </div>
       </div>
      )}
      

      <div className='lyrics'>
      
         {lyrics}
      </div>
           
            
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
    </div>
    </>
  )
}
