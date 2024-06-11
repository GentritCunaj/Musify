import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';

const DrawingCanvas = () => {
  const pixiContainerRef = useRef(null);
  let app = null;
  let graphics = null;
  let isDrawing = false;

  useEffect(() => {
    app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0xffffff // Set background color to white
    });
    pixiContainerRef.current.appendChild(app.view);

    graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);

    app.renderer.plugins.interaction.on('pointerdown', startDrawing);
    app.renderer.plugins.interaction.on('pointermove', draw);
    app.renderer.plugins.interaction.on('pointerup', stopDrawing);

    return () => {
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, []);

  const startDrawing = (event) => {
    isDrawing = true;
    const { x, y } = event.data.global;
    graphics.lineStyle({ width: 2, color: 0x000000 }); // Set line style to black with thickness 2
    graphics.moveTo(x, y);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { x, y } = event.data.global;
    graphics.lineTo(x, y);
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  return <div ref={pixiContainerRef} />;
};

export default DrawingCanvas;
