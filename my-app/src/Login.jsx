import React from 'react'
import {Container} from 'react-bootstrap';
import { useRef,useState,useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { useLoader,useFrame } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelWithTextures = ({ modelPath, numTextures,objRef }) => {
 
  const [texture, setTexture] = useState([]);
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
    setTexture(loadedTexture);
  }, [modelPath]);
  useEffect(() => {
    // Apply the texture to the model once loaded
    if (texture) {
      objModel.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture, objModel]);



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

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=0279f1ff50264cd6a94b5b3de26c30af&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  const modelPath = '/objs/Vinyl_disc.obj'; // Path to your OBJ model file
  const rotationSpeed = 0.01;
  const objRef = useRef();
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL} >
        Login With Spotify
      </a>
      <Canvas
      style={{ width: '50vh', height: '100vh' }}
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
    </Container>
  )
}
