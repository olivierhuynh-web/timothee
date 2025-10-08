'use client';

import { useEffect, useState } from 'react';
import styles from './stickers.module.scss';

const Stickers = () => {
  const [stickers, setStickers] = useState([]);
  const [mainDimensions, setMainDimensions] = useState({ width: 0, height: 0 });
  const stickerSize = 100; // Taille de base des stickers en pixels

  useEffect(() => {
    // Charger les noms des fichiers de stickers
    const stickerFiles = Array.from({ length: 27 }, (_, i) => `${i + 1}.png`);
    
    // Mettre à jour les dimensions du conteneur principal
    const updateDimensions = () => {
      setMainDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initialiser les dimensions
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Positionner les stickers de manière aléatoire
    const positionedStickers = stickerFiles.map((sticker, index) => {
      // Calculer des positions aléatoires en évitant les bords
      const maxX = mainDimensions.width - stickerSize;
      const maxY = mainDimensions.height - stickerSize;
      
      // S'assurer que les stickers ne sont pas trop proches des bords
      const x = Math.max(20, Math.random() * maxX - 20);
      const y = Math.max(20, Math.random() * maxY - 20);
      
      // Rotation aléatoire entre -15 et 15 degrés
      const rotation = Math.random() * 30 - 15;
      
      // Échelle aléatoire entre 0.8 et 1.2
      const scale = 0.8 + Math.random() * 0.4;
      
      return {
        id: index,
        src: `/stickers/${sticker}`,
        x,
        y,
        rotation,
        scale,
        zIndex: Math.floor(Math.random() * 10) // Pour le chevauchement
      };
    });

    setStickers(positionedStickers);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [mainDimensions.width, mainDimensions.height]);

  return (
    <div className={styles.stickersContainer}>
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className={styles.sticker}
          style={{
            position: 'absolute',
            left: `${sticker.x}px`,
            top: `${sticker.y}px`,
            transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            zIndex: sticker.zIndex,
            width: `${stickerSize}px`,
            height: 'auto',
            pointerEvents: 'none',
          }}
        >
          <img
            src={sticker.src}
            alt={`Sticker ${sticker.id + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Stickers;
