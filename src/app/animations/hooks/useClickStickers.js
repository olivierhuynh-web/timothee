import { useState, useEffect } from 'react';

export const useClickStickers = (sectionRef, sectionName) => {
  const [clickStickers, setClickStickers] = useState([]);

  // Liste de tous les stickers disponibles
  const stickerPaths = Array.from({ length: 27 }, (_, i) => `/stickers/${i + 1}.png`);

  useEffect(() => {
    if (!sectionRef?.current) return;

    const handleClick = (e) => {
      // Vérifie si le clic est sur un élément qui ne doit pas avoir de sticker
      const noStickerElement = e.target.closest('[data-no-sticker]');
      if (noStickerElement) {
        return; // Ignore le clic
      }

      // Sélectionne un sticker aléatoire
      const randomSticker = stickerPaths[Math.floor(Math.random() * stickerPaths.length)];

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

      // Vérifie si le sticker (100px) chevauche une zone interdite
      const stickerSize = 100;
      const marginPx = 0; // Pas de marge verticale
      const marginVw = 0; // Pas de marge horizontale
      const stickerRect = {
        left: x,
        right: x + stickerSize,
        top: y,
        bottom: y + stickerSize
      };

      // Cherche tous les éléments avec data-no-sticker dans la section
      const noStickerElements = sectionRef.current.querySelectorAll('[data-no-sticker]');
      for (const element of noStickerElements) {
        const elementRect = element.getBoundingClientRect();
        const elementTopRelative = elementRect.top - rect.top + scrollTop;
        const elementBottomRelative = elementTopRelative + elementRect.height;
        const elementLeftRelative = elementRect.left - rect.left;
        const elementRightRelative = elementLeftRelative + elementRect.width;

        // Agrandit la zone interdite avec la marge (horizontale en vw, verticale en px)
        const forbiddenZone = {
          left: elementLeftRelative - marginVw,
          right: elementRightRelative + marginVw,
          top: elementTopRelative - marginPx,
          bottom: elementBottomRelative + marginPx
        };

        // Vérifie le chevauchement
        const overlaps = !(
          stickerRect.right < forbiddenZone.left ||
          stickerRect.left > forbiddenZone.right ||
          stickerRect.bottom < forbiddenZone.top ||
          stickerRect.top > forbiddenZone.bottom
        );

        if (overlaps) {
          console.log('🚫 Sticker bloqué:', {
            marginPx: marginPx + 'px',
            marginVw: marginVw + 'px (1vw)',
            stickerRect,
            forbiddenZone,
            overlaps
          });
          return; // Bloque la création du sticker
        }
      }

      // DEBUG
      console.log('🎯 Click Debug:', {
        sectionName,
        'e.clientY': e.clientY,
        'rect.top': rect.top,
        'scrollTop parent': sectionRef.current.scrollTop,
        'scrollTop enfant': scrollingElement.scrollTop,
        'y calculé': y,
        'Element qui scroll': scrollingElement.className
      });

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
