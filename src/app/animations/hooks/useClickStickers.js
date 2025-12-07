import { useState, useEffect } from 'react';

export const useClickStickers = (sectionRef, sectionName) => {
  const [clickStickers, setClickStickers] = useState([]);

  // Liste de tous les stickers disponibles
  const stickerPaths = Array.from({ length: 27 }, (_, i) => `/stickers/${i + 1}.png`);

  useEffect(() => {
    if (!sectionRef?.current) return;

    const handleClick = (e) => {
      // Sélectionne un sticker aléatoire
      const randomSticker = stickerPaths[Math.floor(Math.random() * stickerPaths.length)];

      // Rotation aléatoire entre -15 et 15 degrés
      const rotation = Math.random() * 30 - 15;

      // Échelle aléatoire entre 0.8 et 1.2
      const scale = 0.8 + Math.random() * 0.4;

      // Récupère la position relative à la section
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 50; // Position relative à la section
      const y = e.clientY - rect.top - 50;

      // Crée le nouveau sticker
      const newSticker = {
        id: `click-${sectionName}-${Date.now()}-${Math.random()}`,
        src: randomSticker,
        x,
        y,
        rotation,
        scale,
      };

      setClickStickers((prev) => [...prev, newSticker]);
    };

    // Ajoute l'event listener sur la section spécifique
    const section = sectionRef.current;
    section.addEventListener('click', handleClick);

    return () => {
      section.removeEventListener('click', handleClick);
    };
  }, [sectionRef, sectionName]);

  return { clickStickers, setClickStickers };
};
