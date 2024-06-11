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

const PixiMusicGame = () => {
  const pixiContainerRef = useRef(null);
  const audioRefs = useRef({}); // Ref to store active audio elements
  let dragging = false;
  let line = null;
  

  useEffect(() => {
    const app = new PIXI.Application();

    app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      sharedLoader: true,
    }).then(() => {
      document.body.appendChild(app.canvas);

      // Function to handle mouse down event
      const handleMouseDown = (event) => {
  dragging = true;

  // Start drawing line
  const graphics = new PIXI.Graphics();
  line = graphics;
  app.stage.addChild(graphics); // Add graphics to the stage
  graphics.setStrokeStyle(2, 0xffffff); // Set line style
  const rect = app.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  graphics.moveTo(x, y);
};

      // Function to handle mouse move event
      const handleMouseMove = (event) => {
        if (dragging) {
          // Continue drawing line
          const rect = app.canvas.getBoundingClientRect(); // Get bounding rectangle of canvas
          const x = event.clientX - rect.left; // Calculate mouse X position relative to canvas
          const y = event.clientY - rect.top; // Calculate mouse Y position relative to canvas
          console.log('Drawing line at:', x, y); // Log mouse position
          line.lineTo(x, y); // Update line to mouse position on canvas
          
          // Play sound based on position
          const note = calculateNote({ x, y }); // Pass an object with x and y properties
          if (note) {
            playSound(note);
          }
        }
      };
      

      // Function to handle mouse up event
      const handleMouseUp = () => {
        dragging = false;
        app.stage.removeChild(line); // Remove drawn line
      };

      // Listen for mouse events
      app.renderer.canvas.addEventListener('mousedown', handleMouseDown);
      app.renderer.canvas.addEventListener('mousemove', handleMouseMove);
      app.renderer.canvas.addEventListener('mouseup', handleMouseUp);

      // Destroy Pixi.js application on unmount
      return () => {
        app.destroy(true, { children: true, texture: true, baseTexture: true });
      };
    }).catch((error) => {
      console.error('Error initializing Pixi.js:', error);
    });
  }, []);

  // Function to calculate note based on position
  const calculateNote = (position) => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const xRatio = position.x / canvasWidth;
    const yRatio = position.y / canvasHeight;
    const column = Math.floor(xRatio * 3); // Divide canvas into 3 columns
    const row = Math.floor(yRatio * 4); // Divide canvas into 4 rows
    const noteIndex = column + row * 3; // Combine row and column to get note index (0-11)
    
    // Define notes corresponding to each index
    const notes = [note1, note2, note3, note4, note5, note6, note7, note8, note9, note10, note11, note12];

    return notes[noteIndex];
  };

  // Function to play sound
  const playSound = (soundFile) => {
    if (!audioRefs.current[soundFile]) {
      const audio = new Audio(soundFile);
      audio.addEventListener('ended', () => {
        delete audioRefs.current[soundFile]; // Remove audio from active list when it ends
      });
      audioRefs.current[soundFile] = audio; // Add audio to active list
      audio.play().catch(error => {
        console.error('Failed to play sound:', error);
      });
    }
  };

  return <div ref={pixiContainerRef} />;
};

export default PixiMusicGame;
