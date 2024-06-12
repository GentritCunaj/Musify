import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import note1 from './sounds/note1.mp3';
import note2 from './sounds/note2.mp3';
import note3 from './sounds/note3.mp3';
import note4 from './sounds/note4.mp3';
import note5 from './sounds/note5.mp3';
import note6 from './sounds/note6.mp3';
import note7 from './sounds/note7.mp3';
import note8 from './sounds/note8.mp3';
import note9 from './sounds/note9.mp3';
import note10 from './sounds/note10.mp3';
import note11 from './sounds/note11.mp3';
import note12 from './sounds/note12.mp3';
import musicImage from './images/music.png'; // Adjust the path to your image
import musicImage2 from './images/music2.png';
import musicImage3 from './images/music3.png';

const PixiMusicGame = ({shouldRender}) => {
  const pixiContainerRef = useRef(null);
  const audioRefs = useRef({}); // Ref to store active audio elements
  const textures = useRef([]); // Ref to store loaded textures
  let dragging = false;

  useEffect(() => {
    if (shouldRender){
        shouldRender=false;
    const app = new PIXI.Application();

    app.init({
      width: window.innerWidth / 2,
      height: window.innerHeight /2 ,
      backgroundColor: 0xBFD0D3,
      sharedLoader: true,
    }).then(() => {
      pixiContainerRef.current.appendChild(app.canvas);

      // Load image textures
      const loadImages = (sources, callback) => {
        let loadedImages = 0;
        sources.forEach((src, index) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            textures.current[index] = PIXI.Texture.from(img);
            loadedImages += 1;
            if (loadedImages === sources.length) {
              callback();
            }
          };
        });
      };

      const imageSources = [musicImage, musicImage2, musicImage3]; // Define your image sources
      loadImages(imageSources, () => {
        console.log('Images loaded');
      });

      // Function to play sound and show image
      const playSound = (soundFile, x, y) => {
        if (!audioRefs.current[soundFile]) {
          const audio = new Audio(soundFile);
          audio.addEventListener('ended', () => {
            delete audioRefs.current[soundFile]; // Remove audio from active list when it ends
          });
          audioRefs.current[soundFile] = audio; // Add audio to active list
          audio.play().then(() => {
            // Add sprite with image to PIXI stage
            const randomTexture = textures.current[Math.floor(Math.random() * textures.current.length)];
            const sprite = new PIXI.Sprite(randomTexture);
            sprite.anchor.set(0.5);
            sprite.position.set(x, y);
            // Set size to around 100x100
            sprite.width = 120;
            sprite.height = 70;
            app.stage.addChild(sprite);

            // Remove sprite after 1 second
            setTimeout(() => {
              app.stage.removeChild(sprite);
            }, 1000);
          }).catch(error => {
            console.error('Failed to play sound:', error);
          });
        }
      };

      // Function to calculate note based on position
      const calculateNote = (position) => {
        const canvasWidth = window.innerWidth / 2;
        const canvasHeight = window.innerHeight / 2;
        const xRatio = position.x / canvasWidth;
        const yRatio = position.y / canvasHeight;
        const column = Math.floor(xRatio * 6); 
        const row = Math.floor(yRatio * 6); 
        const noteIndex = column + row * 6; 
    
        // Define notes corresponding to each index
        const notes = [
            note7, note2, note3, note4, note5, note6,
            note7, note8, note9, note10, note11, note12,
            // Duplicate the notes to make the grid denser
            note10, note2, note3, note4, note5, note6,
            note7, note8, note9, note10, note11, note12,
            note12, note2, note3, note4, note5, note6,
            note7, note8, note9, note10, note11, note12,
        ];
    
        // Ensure that noteIndex is within the bounds of the notes array
        const adjustedIndex = noteIndex % notes.length;
    
        return notes[adjustedIndex];
    };

      // Function to handle mouse down event
      const handleMouseDown = (event) => {
        dragging = true;
        const rect = app.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const note = calculateNote({ x, y });
        if (note) {
          playSound(note, x, y);
        }
      };

      // Function to handle mouse move event
      const handleMouseMove = (event) => {
        if (dragging) {
          const rect = app.canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const note = calculateNote({ x, y });
          if (note) {
            playSound(note, x, y);
          }
        }
      };

      // Function to handle mouse up event
      const handleMouseUp = () => {
        dragging = false;
      };

      // Listen for mouse events on canvas element
      app.canvas.addEventListener('mousedown', handleMouseDown);
      app.canvas.addEventListener('mousemove', handleMouseMove);
      app.canvas.addEventListener('mouseup', handleMouseUp);

      // Destroy Pixi.js application on unmount
      return () => {
        app.destroy(true, { children: true, texture: true, baseTexture: true });
      };
    }).catch((error) => {
      console.error('Error initializing Pixi.js:', error);
    });
}
}, [shouldRender]);

  return <div ref={pixiContainerRef} />;
};

export default PixiMusicGame;
