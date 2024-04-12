import React from 'react';
import { useLoader } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export const ModelWithTextures = ({ modelPath, numTextures }) => {
  const objModel = useLoader(OBJLoader, modelPath);
  const textureLoader = new TextureLoader();

  // Iterate over the number of textures
  for (let i = 1; i <= numTextures; i++) {
    const texturePath = `/textures/${i}_BaseColor.png`;
    const texture = textureLoader.load(texturePath);

    // Apply texture to corresponding mesh in the loaded model
    objModel.traverse((child) => {
      if (child.isMesh && child.name.includes(`_${i}_BaseColor`)) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }

  return <primitive object={objModel} />;
};
