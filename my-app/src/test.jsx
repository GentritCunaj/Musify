import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';

const PixiMusicComponent = ({ shouldRender }) => {
  useEffect(() => {
    if (shouldRender) {
      const app = new PIXI.Application({
        width: 640,
        height: 360,
        backgroundColor: 0x1099bb,
      });

      document.body.appendChild(app.view);

      // Clean up the PIXI application when the component unmounts
      return () => {
        app.destroy(true);
      };
    }
  }, [shouldRender]);

  return null; // No need to render anything
};

export default PixiMusicComponent;
