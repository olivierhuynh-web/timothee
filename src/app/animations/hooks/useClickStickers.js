import { useState, useEffect, useRef } from 'react';
import { useRefs } from '../context';

// Cache global pour les images préchargées (partagé entre toutes les instances)
const preloadedImages = new Map();
let lastPreloadedPaths = null;

// Fonction de préchargement silencieux
const preloadStickers = (paths) => {
  // Ne précharge que si les paths ont changé
  if (lastPreloadedPaths === paths || !paths.length) return;
  lastPreloadedPaths = paths;

  paths.forEach((path) => {
    if (!preloadedImages.has(path)) {
      const img = new Image();
      img.src = path;
      img.onload = () => preloadedImages.set(path, img);
    }
  });
};

export const useClickStickers = (sectionRef, sectionName) => {
  const [clickStickers, setClickStickers] = useState([]);
  const { stickerPaths } = useRefs();

  // Fallback vers les stickers statiques si aucun sticker n'est chargé
  const activeStickerPaths = stickerPaths.length > 0
    ? stickerPaths
    : Array.from({ length: 27 }, (_, i) => `/stickers/${i + 1}.png`);

  // Précharge les stickers quand ils sont disponibles
  useEffect(() => {
    if (activeStickerPaths.length > 0) {
      preloadStickers(activeStickerPaths);
    }
  }, [activeStickerPaths]);

  useEffect(() => {
    if (!sectionRef?.current) return;

    const handleClick = (e) => {
      // Vérifie si le clic est dans une zone interdite (data-no-sticker)
      // ou si on est dans articles et pas dans la zone autorisée (data-sticker-allowed)
      const clickedElement = e.target;
      const isInNoStickerZone = clickedElement.closest('[data-no-sticker]');
      const isInArticlesSection = sectionName === 'articles';

      if (isInArticlesSection) {
        // Dans articles, on ne peut coller que dans les zones avec data-sticker-allowed
        const isInAllowedZone = clickedElement.closest('[data-sticker-allowed]');
        if (!isInAllowedZone) return;
      } else if (isInNoStickerZone) {
        // Dans les autres sections, on bloque les zones avec data-no-sticker
        return;
      }

      // Sélectionne un sticker aléatoire
      const randomSticker = activeStickerPaths[Math.floor(Math.random() * activeStickerPaths.length)];

      // Rotation aléatoire entre -15 et 15 degrés
      const rotation = Math.random() * 30 - 15;

      // Échelle aléatoire entre 0.8 et 1.2
      const scale = 0.8 + Math.random() * 0.4;

      // Récupère la position relative à la section
      const rect = sectionRef.current.getBoundingClientRect();

      // Trouve l'élément qui scroll réellement (peut être un enfant)
      let scrollingElement = sectionRef.current;
      let scrollTop = scrollingElement.scrollTop;

      // Si scrollTop est 0, cherche dans les enfants
      if (scrollTop === 0 && scrollingElement.children.length > 0) {
        const firstChild = scrollingElement.children[0];
        if (firstChild.scrollTop > 0 || firstChild.scrollHeight > firstChild.clientHeight) {
          scrollingElement = firstChild;
          scrollTop = firstChild.scrollTop;
        }
      }

      const x = e.clientX - rect.left - 50; // Position relative à la section
      const y = e.clientY - rect.top + scrollTop - 50; // Inclut le scroll

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
  }, [sectionRef, sectionName, activeStickerPaths]);

  return { clickStickers, setClickStickers };
};
