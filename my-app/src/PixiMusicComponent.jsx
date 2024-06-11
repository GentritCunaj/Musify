import React, { useRef, useMemo,useState } from 'react';
import * as PIXI from 'pixi.js';
import musicImage from './images/music.png'; // Adjust the path to your image
import musicImage2 from './images/music2.png';
import musicImage3 from './images/music3.png';
const PixiMusicComponent = ({ shouldRender }) => {
  const pixiContainerRef = useRef(null);

  useMemo(() => {
    if (shouldRender){
      shouldRender=false;
    const app = new PIXI.Application();
    app.init({
      width: window.innerWidth,
      height: window.innerHeight ,
      backgroundColor: 0xD3C2BF,
    }).then(() => {


      document.body.appendChild(app.canvas);
      
    

      const imageSources = [musicImage, musicImage2,musicImage3];
      const textures = [];

      const loadImages = (sources, callback) => {
        let loadedImages = 0;
        sources.forEach((src, index) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            textures[index] = PIXI.Texture.from(img);
            loadedImages += 1;
            if (loadedImages === sources.length) {
              callback();
            }
          };
        });
      };

      loadImages(imageSources, () => {
        const musicKeys = [];
        for (let i = 0; i < 30; i++) {
          const randomTexture = textures[Math.floor(Math.random() * textures.length)];
          const musicKey = new PIXI.Sprite(randomTexture);

          const steps = (200 - 100) / 20;
          const randomStepIndex = Math.floor(Math.random() * (steps + 1));
          const sizew = 25 + randomStepIndex * 20;
          const sizeh = 25 + randomStepIndex * 20;

          musicKey.width = sizew;
          musicKey.height = sizeh;

          musicKey.position.set(
            Math.random() * app.screen.width,
            Math.random() * app.screen.height
          );
          musicKey.anchor.set(0.5);
          musicKey.vx = Math.random() * 3 - 1;
          musicKey.vy = Math.random() * 3 - 1;
          app.stage.addChild(musicKey);
          musicKeys.push(musicKey);
        }

        app.ticker.add(() => {
          musicKeys.forEach((musicKey) => {
            musicKey.x += musicKey.vx;
            musicKey.y += musicKey.vy;

            if (musicKey.x < 0 || musicKey.x > app.screen.width) {
              musicKey.vx *= -1;
            }
            if (musicKey.y < 0 || musicKey.y > app.screen.height) {
              musicKey.vy *= -1;
            }
          });
        });
      });
    const handleResize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }).catch((error) => {
    console.error(error);
  });

}
  }, [shouldRender]);

  return null;
};

export default PixiMusicComponent;
