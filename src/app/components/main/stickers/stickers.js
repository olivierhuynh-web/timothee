'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './stickers.module.scss';

const Stickers = ({ count = 27 }) => {
  const [stickers, setStickers] = useState([]);
  const [mainDimensions, setMainDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const stickerSize = 100; // Taille de base des stickers en pixels

  useEffect(() => {
    let lastWidth = 0;
    let lastHeight = 0;

    // Met à jour les dimensions du conteneur parent (main)
    const updateDimensions = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const newWidth = parent.offsetWidth;
          const newHeight = parent.scrollHeight;

          // Ne met à jour que si les dimensions sont valides (> 0) ET ont changé significativement
          const widthChanged = Math.abs(newWidth - lastWidth) > 10;
          const heightChanged = Math.abs(newHeight - lastHeight) > 10;

          if (newWidth > 0 && newHeight > 0 && (widthChanged || heightChanged)) {
            lastWidth = newWidth;
            lastHeight = newHeight;
            setMainDimensions({
              width: newWidth,
              height: newHeight,
            });
          }
        }
      }
    };

    // Initialise les dimensions avec un délai pour attendre le rendu complet
    const timer = setTimeout(() => {
      updateDimensions();
    }, 100);

    // Observe les changements de taille du parent avec un interval
    const interval = setInterval(updateDimensions, 500);

    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    // Attend que les dimensions soient disponibles
    if (mainDimensions.width === 0 || mainDimensions.height === 0) return;

    // Charge les noms des fichiers de stickers
    const totalStickers = 27;
    const stickerFiles = Array.from({ length: Math.min(count, totalStickers) }, () => {
      // Sélectionne aléatoirement des stickers parmi les 27 disponibles
      const randomIndex = Math.floor(Math.random() * totalStickers) + 1;
      return `${randomIndex}.png`;
    });

    // Positionne les stickers de manière aléatoire
    const positionedStickers = stickerFiles.map((sticker, index) => {
      // Calcule des positions aléatoires en évitant les bords
      const maxX = mainDimensions.width - stickerSize;
      const maxY = mainDimensions.height - stickerSize;

      // S'assure que les stickers ne sont pas trop proches des bords
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
        zIndex: Math.floor(Math.random() * 10),
      };
    });

    setStickers(positionedStickers);
  }, [mainDimensions.width, mainDimensions.height]);

  return (
    <div
      ref={containerRef}
      className={styles.stickersContainer}
      style={{ height: mainDimensions.height > 0 ? `${mainDimensions.height}px` : '100%' }}
    >
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
          <Image
            src={sticker.src}
            alt={`Sticker ${sticker.id + 1}`}
            width={stickerSize}
            height={stickerSize}
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
